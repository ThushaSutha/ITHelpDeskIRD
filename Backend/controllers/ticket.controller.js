const { where } = require("sequelize");
const db = require("../models");
const Ticket = db.ticket;
const Ticket_Category = db.ticket_category;
const Op = db.Sequelize.Op;
const { encrypt, decrypt } = require("../helper/helper");

//create and save a new ticket
exports.create = async (req, res) => {
        // Validate request
        if (!req.body.title) {
            return res.status(400).send({
                message: "Title cannot be empty"
            });
        }

        // Create a ticket
        const ticket = {
            title: req.body.title,
            description: req.body.description,
            status_id: req.body.status,
            user_id: req.body.userId,
            assigned_to: req.body.assignedTo,
            priority: req.body.priority,
            category_id: req.body.category
        };

        Ticket.create(ticket)
        .then(data=>{
            res.status(201).send({
                message: "Ticket created successfully",
                data: data
            });
        }).catch(err=>{
            res.status(500).send({
                message: err.message ||  "Error creating ticket",
            });
        });    
};


//Retrieve all tickets from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` }} : null;

    Ticket.findAll({ where: condition})
    .then(data => {
        res.status(200).send({
            message: "All tickets retrieved successfully",
            data: data
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving tutorials."
        });
    });


};

//Find a single ticket with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Ticket.findByPk(id)
    .then(data =>{
        if (data){
            res.status(200).send({
                message: "Ticket found successfully",
                data: data
            });
        }else{
            res.status(404).send({
                message: "Ticket not found with id " + id
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error retrieving Ticket with id " + id
        });
    });
};


//Find  tickets with an specific user
exports.findByUser = async (req, res) => {
    const id = req.headers['x-auth-id'];
    const iv = req.headers['x-auth-iv'];
    const { page = 1 , size = 5 } = req.query;
    const limit = +size;
    const offset = (page - 1) * size;
    console.log("id",id);

    if (!id || !iv) {
        return res.status(400).send({ message: "Missing authentication token or IV in",iv});
    }

    try {
        const decryptId = decrypt(id,iv);
        var condition = id ? { user_id: {[Op.like]: `%${decryptId}%`}} : null;
        console.log("in tiket user_id", decryptId);
        const tickets = await Ticket.findAndCountAll({
            where: condition,
            limit: limit,
            offset: offset
        });
        console.log(tickets.rows);
        res.status(200).send({
            message: "Tickets found successfully",
            data:tickets.rows,
            totalItems: tickets.count,
            totalPages: Math.ceil(tickets.count/limit),
            currentPage: page
        });
        
    } catch (error) {
        res.status(500).send({
            message: error.message || "Error retrieving tickets with user id " + id
        });
    }
};

//update a ticket by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Ticket.update(req.body,{
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "Ticket updated successfully"
            });
        }else{
            res.status(404).send({
                message: `Cannot update Ticket with id=${id}. Maybe Ticket was not found or req.body`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error updating Ticket with id " + id
        });
    });

};

//delete a ticket with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Ticket.destroy({
        where: { id: id }
    }).then(num =>{
        if (num ==1){
            res.status(200).send({
                message: "Ticket deleted successfully"
            });
        }else{
            res.status(404).send({
                message: `Cannot delete Ticket with id=${id}. Maybe Ticket was not found`
            });
        }
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "Could not delete Ticket with id " + id
        });
    });


};

//retrieve all deleted tickets
exports.findAllDeleted = (req, res) => {
    const title = req.query.title;
    const { page = 1, size = 10 } = req.query; // Default values for pagination
    const limit = +size;
    const offset = (page - 1) * size;

    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Ticket.findAndCountAll({
        where: {
            ...condition,
            deletedAt: { [Op.ne]: null }},
        paranoid: false,
        limit: limit,
        offset: offset,
    })
        .then(result => {
            res.status(200).send({
                message: "Deleted Tickets retrieved successfully",
                data: result.rows,
                totalItems: result.count,
                totalPages: Math.ceil(result.count / limit),
                currentPage: page
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving Deleted Tickets with title = " + title
            });
        });
};

//retrieve the deleted ticket by id
exports.restoreTicket = (req, res) => {
    const id = req.params.id;
    Ticket.restore({ where: { id: id } })
    .then( num =>{
        if (num == 1) {
            res.status(200).send({
                message: "Ticket was restored successfully with id " + id
            });
        }else{
            res.status(404).send({
                message: `Cannot restore Ticket with id=${id}. Maybe Ticket was not found or req.body`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error restoring Ticket with id = " + id
        });
    });
};





//delete all tickets from the database.
exports.deleteAll = (req, res) => {

};


