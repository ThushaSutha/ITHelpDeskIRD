const {where} = require('sequelize');
const db = require('../models');
const Image = db.ticket_image;
const Op = db.Sequelize.Op;


exports.create = (req,res) =>{
    if(!req.body.path){
        res.status(400).send({
            message: "Path can not be empty"
        });
        return;
    }


    //create a image
    const image = {
        path: req.body.path,
        ticket_id: req.body.ticketId,
    };

    //save image in the database
    Image.create(image)
    .then(data =>{
        res.status(201).send({
            message: "Image created successfully",
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Image."
        });
    });
};

//Retrieve all image from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` }} : null;

    Image.findAll({ where: condition})
    .then(data => {
        res.status(200).send({
            message: "All images retrieved successfully",
            data: data
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving tutorials."
        });
    });


};

// find a single image with a id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Image.findByPk(id)
    .then(data => {
        if(data){
            res.status(200).send({
                message: "Image found",
                data: data
            });
        }else{
            res.status(404).send({
                message: "Image not found"
            });
        }
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving image"
        });
    });
};

//update a image by the id in the request
exports.update = (req,res) => {
    const id = req.params.id;

    Image.update(req.body,{
        where: {id: id}
    }).then(num =>{
        if(num == 1){
            res.status(200).send({
                message: "Image updated successfully"
            });
        }else{
            res.status(404).send({
                message: "Image not found"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error updating Image"
        });
    });
};


//delete a image with the specified id in the request
exports.delete = (req,res) => {
    const id = req.params.id;

    Image.destroy({
        where: {id: id}
    }).then(num => {
        if(num == 1){
            res.status(200).send({
                message: "Image deleted successfully"
            });
        }else{
            res.status(404).send({
                message: "Image not found"
            });
        }
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "Could not delete Image!"
        });
    });
};

//retrieve all deleted images
exports.findAllDeleted = (req,res) =>{
    const { page = 1 , size = 10 } = req.query;
    const limit = size * 1;
    const offset = (page - 1) * size;

    Image.findAndCountAll({
        where: {
            deletedAt: {[Op.ne]: null}},
        paranoid: false,
        limit: limit,
        offset: offset,
        
    }).then(result => {
        res.status(200).send({
            message: "Deleted Images retrieved successfully",
            data: result.rows,
            totalItems: result.count,
            totalPages: Math.ceil(result.count / limit),
            currentPage: page
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error retrieving deleted Images"
        });
    });
    
};




