const {where} = require('sequelize')
const db = require('../models');;
const company = db.company;
const Op = db.Sequelize.Op;

exports.create = (req,res) =>{
    if(!req.body.name) {
        res.status(400).send({
            message:"Name can not be empty"
        });
        return;
    }

    //create a company
    const company = {
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone : req.body.phone,
        service_start: req.body.service_start,
        service_end: req.body.service_end,
    };

    company.create(company)
    .then(data=>{
        res.status(201).send({
            message:"company created successfully",
            data:data
        });
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "Some error occurred while creating the company."
        });
    });
};


//Retrieve all company from database
exports.findAll=(req,res)=>{
    
    company.findAll()
    .then(data=>{
        res.status(200).send({
            message:"All categories retrieved successfully ",
            data:data

        });
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "Some error occurred while retrieving categories.",
        });
    });
};

// find a single company with a id
exports.findOne = (req, res) => {
    const id = req.params.id;

    company.findByPk(id)
    .then(data => {
        if(data){
            res.status(200).send({
                message: "company found",
                data: data
            });
        }else{
            res.status(404).send({
                message: "company not found"
            });
        }
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving company"
        });
    });
};

//update a region by the id in the request
exports.update = (req,res) => {
    const id = req.params.id;

    company.update(req.body,{
        where: {id: id}
    }).then(num =>{
        if(num == 1){
            res.status(200).send({
                message: "company updated successfully"
            });
        }else{
            res.status(404).send({
                message: "company not found"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error updating company"
        });
    });
};


//delete a company with the specified id in the request
exports.delete = (req,res) => {
    const id = req.params.id;

    company.destroy({
        where: {id: id}
    }).then(num => {
        if(num == 1){
            res.status(200).send({
                message: "company deleted successfully"
            });
        }else{
            res.status(404).send({
                message: "company not found"
            });
        }
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "Could not delete company!"
        });
    });
};

//retrieve all deleted company
exports.findAllDeleted = (req,res) =>{
    const { page = 1 , size = 10 } = req.query;
    const limit = size * 1;
    const offset = (page - 1) * size;

    company.findAndCountAll({
        where: {
            deletedAt: {[Op.ne]: null}},
        paranoid: false,
        limit: limit,
        offset: offset,
        
    }).then(result => {
        res.status(200).send({
            message: "Deleted company retrieved successfully",
            data: result.rows,
            totalItems: result.count,
            totalPages: Math.ceil(result.count / limit),
            currentPage: page
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error retrieving deleted Categories"
        });
    });
    
};