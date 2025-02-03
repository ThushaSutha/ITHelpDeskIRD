const { where } = require("sequelize");
const db = require("../models");
const Ticket = db.ticket;
const Ticket_Image = db.ticket_image;
const { encrypt, decrypt } = require("../helper/helper");
const multer = require('multer');
const path = require('path');
const fs = require("fs");
const Op = db.Sequelize.Op;
const User = db.user;
const Category = db.category;
const Device = db.device;
// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // folder name 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Generate unique filename
    }
});
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
// Multer configuration for multiple file uploads
exports.upload = multer({ 
    storage,
    limits: { fileSize: 10 * 1024 * 1024 } // Limit file size to 10MB
}); 


// Create and save a new ticket
exports.create = [this.upload.array('file',10),async (req, res) => {

        const id = req.headers['x-auth-id'];
        const iv = req.headers['x-auth-iv'];
        const serverUrl = 'http://localhost:8080';

        if (!id || !iv) {
            return res.status(400).send({ message: "Missing authentication token or IV" });
        }

        if (!req.body.issueType) {
            return res.status(400).send({ message: "Category cannot be empty" });
        }

        const decryptId = decrypt(id, iv);

        const ticket = {
            description: req.body.description,
            status: req.body.status,
            user_id: decryptId,
            priority: req.body.priorityLevel,
            category_id: req.body.issueType,
            device_id: req.body.deviceCategory,
            serial_no: req.body.serviceTag,
            model: req.body.model,
            brand: req.body.brand,
            title: req.body.file,
        };
        

        try {
            const ticketData = await Ticket.create(ticket);

            if (req.files && req.files.length > 0) {
                console.log('Image uploaded:', req.files.length);
                console.log(req.files);
        
                // Process and save each uploaded file
                const images = req.files.map(file => ({
                    path: `${serverUrl}/${path.join(file.path).replace(/\\/g, '/')}`, 
                    ticket_id: ticketData.id,
                }));
        
                // Bulk insert all images into the database
                await Ticket_Image.bulkCreate(images);
            } else {
                console.log("No image uploaded");
            }

            res.status(201).send({ message: "Ticket created successfully", data: ticketData });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message || "Error creating ticket" });
        }
    
}];

//Retrieve all tickets from the database. with out pagination
exports.findAllWithoutPagination = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` }} : null;

    Ticket.findAll({ where: condition})
    .then(data => {
        res.status(200).send({
            message: "All units retrieved successfully",
            data: data
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving tutorials."
        });
    });


};


//Retrieve all tickets from the database.
exports.findAll = async (req, res) => {
    const { page = 1, size = 5 } = req.query;
    const pageNum = Math.max(1, Number(page) || 1);
    const limit = Math.max(1, Number(size) || 5);
    const offset = (pageNum - 1) * limit;
    
    try {
        const result = await Ticket.findAndCountAll({
            limit: limit,
            offset: offset,
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: User,
                    attributes: ['name'],
                    as: 'assigned'
                },
                {
                    model: Category,
                    attributes: ['name'],
                    as: 'category'
                },
                {
                    model: Device,
                    attributes: ['brand', 'model', 'device_type'],
                    as: 'device'
                },
                {
                    model: Ticket_Image,
                    attributes: ['path', 'id'],
                    as: 'ticket_images'
                }
            ]
        });

        const totalItems = await Ticket.count({
            where: {
                deletedAt: null // Ensure soft-deleted tickets are excluded
            }
        });

        res.status(200).send({
            message: "All tickets retrieved successfully",
            data: result.rows.map(ticket => ({
                id: ticket.id,
                description: ticket.description,
                status: ticket.status,
                user_id: ticket.user_id,
                assigned_to: ticket.assigned ? ticket.assigned.name : 'null',
                user_name: ticket.user ? ticket.user.name : 'No associated user',
                priority: ticket.priority,
                category_id: ticket.category_id,
                category: ticket.category ? ticket.category.name : 'null',
                device: ticket.device ? ticket.device.device_type : 'null',
                serial_no: ticket.serial_no,
                model: ticket.device ? ticket.device.model : 'null',
                brand: ticket.device ? ticket.device.brand : 'null',
                file: ticket.ticket_images.length ? ticket.ticket_images : [],
                createdAt: ticket.createdAt,
                updatedAt: ticket.updatedAt
            })),
            totalItems: totalItems,  
            totalPages: Math.ceil(totalItems / limit),
            currentPage: +page
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving tickets."
        });
    }
};






//Find a single ticket with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Ticket.findByPk(id)
        .then(data => {
            if (data) {
                res.status(200).send({
                    message: "Ticket found successfully",
                    data: data
                });
            } else {
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
    const { page = 1, size = 5 } = req.query;
    const limit = +size;
    const offset = (page - 1) * size;
    console.log("id", id);

    if (!id || !iv) {
        return res.status(400).send({ message: "Missing authentication token or IV in", iv });
    }

    try {
        const decryptId = decrypt(id, iv);
        let condition = " ";
        if(decryptId === "4" ){
            console.log("IF") ;
            condition = decryptId === "4" ? {} : { user_id: decryptId };
        }else{
            console.log("ELSE");
            condition = id ? { user_id: { [Op.like]: `%${decryptId}%` } } : null;
        }
        
        console.log("in tiket user_id", decryptId);
        console.log("condition ",condition);
        const tickets = await Ticket.findAndCountAll({
            where: condition,
            limit: limit,
            offset: offset
        });
        console.log(tickets.rows);
        res.status(200).send({
            message: "Tickets found successfully",
            data: tickets.rows,
            totalItems: tickets.count,
            totalPages: Math.ceil(tickets.count / limit),
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
    Ticket.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "Ticket updated successfully"
            });
        } else {
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
    }).then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "Ticket deleted successfully"
            });
        } else {
            res.status(404).send({
                message: `Cannot delete Ticket with id=${id}. Maybe Ticket was not found`
            });
        }
    }).catch(err => {
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
            deletedAt: { [Op.ne]: null }
        },
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
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Ticket was restored successfully with id " + id
                });
            } else {
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

