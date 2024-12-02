const {where} = require('sequelize');
const db = require('../models');
const Region = db.region;
const Op = db.Sequelize.Op;

exports.create = (req,res) =>{
    if(!req.body.name){
        res.status(400).send({
            message: "Name can not be empty"
        });
        return;
    }


    //create a region
    const region = {
        name: req.body.name,

    };

    //save region in the database
    Region.create(region)
    .then(data =>{
        res.status(201).send({
            message: "Region created successfully",
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Region."
        });
    });
};

//Retrieve all region from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` }} : null;

    Region.findAll({ where: condition})
    .then(data => {
        res.status(200).send({
            message: "All regions retrieved successfully",
            data: data
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving tutorials."
        });
    });


};

// find a single region with a id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Region.findByPk(id)
    .then(data => {
        if(data){
            res.status(200).send({
                message: "Region found",
                data: data
            });
        }else{
            res.status(404).send({
                message: "Region not found"
            });
        }
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving region"
        });
    });
};

//update a region by the id in the request
exports.update = (req,res) => {
    const id = req.params.id;

    Region.update(req.body,{
        where: {id: id}
    }).then(num =>{
        if(num == 1){
            res.status(200).send({
                message: "Region updated successfully"
            });
        }else{
            res.status(404).send({
                message: "Region not found"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error updating Region"
        });
    });
};


//delete a region with the specified id in the request
exports.delete = (req,res) => {
    const id = req.params.id;

    Region.destroy({
        where: {id: id}
    }).then(num => {
        if(num == 1){
            res.status(200).send({
                message: "Region deleted successfully"
            });
        }else{
            res.status(404).send({
                message: "Region not found"
            });
        }
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "Could not delete Region!"
        });
    });
};

//retrieve all deleted regions
exports.findAllDeleted = (req,res) =>{
    const { page = 1 , size = 10 } = req.query;
    const limit = size * 1;
    const offset = (page - 1) * size;

    Region.findAndCountAll({
        where: {
            deletedAt: {[Op.ne]: null}},
        paranoid: false,
        limit: limit,
        offset: offset,
        
    }).then(result => {
        res.status(200).send({
            message: "Deleted Regions retrieved successfully",
            data: result.rows,
            totalItems: result.count,
            totalPages: Math.ceil(result.count / limit),
            currentPage: page
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error retrieving deleted Regions"
        });
    });
    
};




