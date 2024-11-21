const { where } = require("sequelize");
const db = require("../models");
const Ticket = db.ticket;
const Op = db.Sequelize.Op;

//create and save a new ticket
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Title can not be empty"
        });
        return;
    }

    //create a ticket
    const ticket = {
        title: req.body.title,
        description: req.body.description,
        status_id: req.body.status,
        user_id: req.body.userId,
        assigned_to: req.body.assignedTo,
        priority:req.body.priority
    };

    //save Tutorial in the database
    Ticket.create(ticket)
    .then(data => {
        res.status(201).send({
            message: "Ticket created successfully",
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Ticket.",
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


