const {where} = require('sequelize');
const db = require('../models');
const Unit = db.unit;
const Op = db.Sequelize.Op;

exports.create = (req,res) =>{
    if(!req.body.name){
        res.status(400).send({
            message: "Name can not be empty"
        });
        return;
    }


    //create a unit
    const unit = {
        name: req.body.name,

    };

    //save unit in the database
    Unit.create(unit)
    .then(data =>{
        res.status(201).send({
            message: "Unit created successfully",
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Unit."
        });
    });
};

//Retrieve all unit from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` }} : null;

    Unit.findAll({ where: condition})
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

// find a single unit with a id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Unit.findByPk(id)
    .then(data => {
        if(data){
            res.status(200).send({
                message: "Unit found",
                data: data
            });
        }else{
            res.status(404).send({
                message: "Unit not found"
            });
        }
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving unit"
        });
    });
};

//update a unit by the id in the request
exports.update = (req,res) => {
    const id = req.params.id;

    Unit.update(req.body,{
        where: {id: id}
    }).then(num =>{
        if(num == 1){
            res.status(200).send({
                message: "Unit updated successfully"
            });
        }else{
            res.status(404).send({
                message: "Unit not found"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error updating Unit"
        });
    });
};


//delete a unit with the specified id in the request
exports.delete = (req,res) => {
    const id = req.params.id;

    Unit.destroy({
        where: {id: id}
    }).then(num => {
        if(num == 1){
            res.status(200).send({
                message: "Unit deleted successfully"
            });
        }else{
            res.status(404).send({
                message: "Unit not found"
            });
        }
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "Could not delete Unit!"
        });
    });
};

//retrieve all deleted units
exports.findAllDeleted = (req,res) =>{
    const { page = 1 , size = 10 } = req.query;
    const limit = size * 1;
    const offset = (page - 1) * size;

    Unit.findAndCountAll({
        where: {
            deletedAt: {[Op.ne]: null}},
        paranoid: false,
        limit: limit,
        offset: offset,
        
    }).then(result => {
        res.status(200).send({
            message: "Deleted units retrieved successfully",
            data: result.rows,
            totalItems: result.count,
            totalPages: Math.ceil(result.count / limit),
            currentPage: page
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error retrieving deleted units"
        });
    });
    
};




