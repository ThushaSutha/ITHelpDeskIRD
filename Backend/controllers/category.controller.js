const {where} = require('sequelize')
const db = require('../models');;
const Category = db.category;
const Op = db.Sequelize.Op;

exports.create = (req,res) =>{
    if(!req.body.name) {
        res.status(400).send({
            message:"Name can not be empty"
        });

        return;
    }

    //create a category
    const category = {
        name: req.body.name,
        description: req.body.description
    };

    Category.create(category)
    .then(data=>{
        res.status(201).send({
            message:"Category created successfully",
            data:data
        });
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "Some error occurred while creating the Category."
        });
    });
};


//Retrieve all category from database
exports.findAll=(req,res)=>{
    
    Category.findAll()
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

// find a single category with a id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Category.findByPk(id)
    .then(data => {
        if(data){
            res.status(200).send({
                message: "Category found",
                data: data
            });
        }else{
            res.status(404).send({
                message: "Category not found"
            });
        }
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving category"
        });
    });
};

//update a region by the id in the request
exports.update = (req,res) => {
    const id = req.params.id;

    Category.update(req.body,{
        where: {id: id}
    }).then(num =>{
        if(num == 1){
            res.status(200).send({
                message: "Category updated successfully"
            });
        }else{
            res.status(404).send({
                message: "Category not found"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error updating Category"
        });
    });
};


//delete a Category with the specified id in the request
exports.delete = (req,res) => {
    const id = req.params.id;

    Category.destroy({
        where: {id: id}
    }).then(num => {
        if(num == 1){
            res.status(200).send({
                message: "Category deleted successfully"
            });
        }else{
            res.status(404).send({
                message: "Category not found"
            });
        }
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "Could not delete Category!"
        });
    });
};

//retrieve all deleted Category
exports.findAllDeleted = (req,res) =>{
    const { page = 1 , size = 10 } = req.query;
    const limit = size * 1;
    const offset = (page - 1) * size;

    Category.findAndCountAll({
        where: {
            deletedAt: {[Op.ne]: null}},
        paranoid: false,
        limit: limit,
        offset: offset,
        
    }).then(result => {
        res.status(200).send({
            message: "Deleted Category retrieved successfully",
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