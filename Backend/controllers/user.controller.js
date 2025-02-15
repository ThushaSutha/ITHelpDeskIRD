const { where } = require("sequelize");
const db = require("../models");
const { encrypt, decrypt } = require("../helper/helper");
const User = db.user;
const Ticket = db.ticket;
const Op = db.Sequelize.Op;

exports.allAccess = (req,res)=>{
    res.status(200).send("Public Content.");
};

exports.userBoard = (req,res) => {
    res.status(200).send("User Content.");
};
exports.adminBoard = (req,res) => {
    res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req,res) => {
    res.status(200).send("Moderator Content.");
};

//Retrieve all users
exports.getUsers = async (req,res) => {
    const email = req.body.email;
    const name = req.body.name;
    const { page = 1 , size = 5 } = req.query;
    const limit = +size;
    const offset = (page - 1) * size;

    const id = req.headers['x-auth-id'];
    const iv = req.headers['x-auth-iv'];
    console.log("id",id);



    // Ensure both are provided
    if (!id || !iv) {
        return res.status(400).send({ message: "Missing authentication token or IV",iv});
    }

    try {
        const decryptId =   decrypt(id,iv);
        var condition = name ? { name: { [Op.like]: `%${name}%` } }  : 
    email ? { email: { [Op.like]: `%${email}%` } } : id ? { emId: { [Op.notLike]: `%${decryptId}%` } } : null;
        const users = await User.findAndCountAll({ 
            where: condition, 
            attributes: { exclude: ['password'] } ,
            limit: limit,
            offset: offset
        });
        console.log(users.row);
        res.status(200).send({
            message: "Users retrieved successfully",
            data: users.rows,
            totalItems : users.count,
            totalPages: Math.ceil(users.count / limit),
            currentPage: page
    });
        
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving users.",
        });
        
    }

    
};


//retrieve users list depend on role
exports.findByRole = async (req, res) => {
    const { role } = req.query;

    if (!role) {
        return res.status(400).send({
            message: "Role is required as a query parameter."
        });
    }

    try {
        // Find users with the specified role and include their associated tickets
        const users = await User.findAll({
            where: { role: role }, // Exact match for role
            include: [
                {
                    model: Ticket,
                    attributes: ['id', 'priority', 'status'], // Include relevant ticket attributes
                    as: 'tickets' // Use the alias defined in the association
                }
            ]
        });

        // Format the response
        const response = users.map(user => ({
            id: user.emId,
            name: user.name,
            role: user.role,
            tickets: user.tickets.map(ticket => ({
                id: ticket.id,
               
            }))
        }));

        res.status(200).send({
            message: "Users retrieved successfully.",
            data: response
        });
    } catch (err) {
        console.error("Error retrieving users:", err);
        res.status(500).send({
            message: "An error occurred while retrieving users."
        });
    }
};

//find a user by id
exports.findOne = async (req,res) => {
    const id = req.params.id;
    
    try {
        User.findByPk(id, { attributes: { exclude: ['password'] } })
        .then((data) => {
            if (data) {
                res.status(200).send({
                    message: "User found",
                    data: data
                });
            }else{
                res.status(404).send({
                    message: "User not found"
                });
            }
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving user"
        });
        
    }
};

//update a user by the id in the request
const bcrypt = require('bcryptjs'); // Assuming you're using bcrypt for hashing

exports.update = async (req, res) => {
    const id = req.params.id;

    // Destructure the body
    let { password, passwordStatus, ...updateData } = req.body;

    // If password is provided, hash it before saving
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash password with salt rounds of 10
        updateData.password = hashedPassword; // Add hashed password to updateData
    }

    try {
        const [num] = await User.update(updateData, {
            where: { emId: id }
        });

        if (num === 1) {
            res.status(200).send({
                message: "User was updated successfully"
            });
        } else {
            res.status(404).send({
                message: "Cannot update User. Maybe User was not found"
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error updating User"
        });
    }
}


//delete a user with the specified id in the request
exports.delete = async (req,res) => {
    const id = req.params.id;

    User.destroy({
        where: { emId: id }
    }).then(num =>{
        if (num == 1) {
            res.status(200).send({
                message: "User was deleted successfully"
            });
        }else{
            res.status(404).send({
                message: "Cannot delete User. Maybe User was not found"
            });
        }
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "Could not delete User" 
        });
    });
};

//retrieve all deleted user
exports.findAllDeleted = async (req,res) => {

    const { page = 1 , size = 5} = req.query;
    const limit = +size;
    const offset = (page - 1) * size;

    try {
        const users = await User.findAndCountAll({
            where: { 
                deletedAt: { [Op.ne]: null },
            },
            attributes: { exclude: ['password'] } ,
            paranoid: false,
            limit: limit,
            offset: offset
        });
        res.status(200).send({
            message: " Deleted Users retrieved successfully",
            data: users.rows,
            totalItems: users.count,
            totalPages: Math.ceil(users.count / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving users.",
        });
    }
};

//retrieve the deleted user by id
exports.restoreUser = (req,res) => {
    const id = req.params.id;

    User.restore({where:{id: id}})
    .then( num => {
        if (num == 1) {
            res.status(200).send({
                message: "User was restored successfully"
            });

        }else{
            res.status(404).send({
                message: "Cannot restore User. Maybe User was not found"

            });
        }
    }).catch( err => {
        res.status(500).send({
            message: err.message || "Error restoring user"
        });
    })
};

