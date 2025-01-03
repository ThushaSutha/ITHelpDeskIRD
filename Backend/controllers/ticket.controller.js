const { where } = require("sequelize");
const db = require("../models");
const Ticket = db.ticket;
const Ticket_Image = db.ticket_image;
const { encrypt, decrypt } = require("../helper/helper");
const multer = require('multer');
const path = require('path');

// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Define where to store the uploaded files
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Generate unique filename
    }
});

const upload = multer({ storage: storage }).single('ticketFile'); // 'ticketFile' is the expected file field name in the form

// Create and save a new ticket
exports.create = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).send({ message: "File upload failed", error: err.message });
        }

        const id = req.headers['x-auth-id'];
        const iv = req.headers['x-auth-iv'];

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
        console.log('file',req.body.file[0]);

        try {
            const ticketData = await Ticket.create(ticket);

            if (req.file) {
                const image = {
                    filePath: req.file.path,
                    ticket_id: ticketData.id // Use the appropriate field for the foreign key
                };
                await Ticket_Image.create(image);
            }

            res.status(201).send({ message: "Ticket created successfully", data: ticketData });
        } catch (error) {
            res.status(500).send({ message: error.message || "Error creating ticket" });
        }
    });
};



//Retrieve all tickets from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Ticket.findAll({ where: condition })
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
        var condition = id ? { user_id: { [Op.like]: `%${decryptId}%` } } : null;
        console.log("in tiket user_id", decryptId);
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


