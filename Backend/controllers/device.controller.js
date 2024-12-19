const {where} = require('sequelize')
const db = require('../models');;
const Device = db.device;
const Op = db.Sequelize.Op;

exports.create = (req,res) =>{
    if(!req.body.device_type) {
        res.status(400).send({
            message:"Name can not be empty"
        });

        return;
    }

    //create a device
    const device = {
        brand: req.body.brand,
        model: req.body.model,
        serial_number: req.body.serial_number,
        device_type : req.body.device_type,
        purchase_date: req.body.purchase_date,
        warranty_expiration_date: req.body.warranty_expiration_date,
        company_id : req.body.company_id,
        user_id : req.body.user_id
    };

    Device.create(device)
    .then(data=>{
        res.status(201).send({
            message:"device created successfully",
            data:data
        });
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "Some error occurred while creating the device."
        });
    });
};


//Retrieve all device from database
exports.findAll=(req,res)=>{
    
    Device.findAll()
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

// find a single device with a id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Device.findByPk(id)
    .then(data => {
        if(data){
            res.status(200).send({
                message: "device found",
                data: data
            });
        }else{
            res.status(404).send({
                message: "device not found"
            });
        }
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving device"
        });
    });
};

//update a region by the id in the request
exports.update = (req,res) => {
    const id = req.params.id;

    Device.update(req.body,{
        where: {id: id}
    }).then(num =>{
        if(num == 1){
            res.status(200).send({
                message: "device updated successfully"
            });
        }else{
            res.status(404).send({
                message: "device not found"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error updating device"
        });
    });
};


//delete a device with the specified id in the request
exports.delete = (req,res) => {
    const id = req.params.id;

    Device.destroy({
        where: {id: id}
    }).then(num => {
        if(num == 1){
            res.status(200).send({
                message: "device deleted successfully"
            });
        }else{
            res.status(404).send({
                message: "device not found"
            });
        }
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "Could not delete device!"
        });
    });
};

//retrieve all deleted device
exports.findAllDeleted = (req,res) =>{
    const { page = 1 , size = 10 } = req.query;
    const limit = size * 1;
    const offset = (page - 1) * size;

    Device.findAndCountAll({
        where: {
            deletedAt: {[Op.ne]: null}},
        paranoid: false,
        limit: limit,
        offset: offset,
        
    }).then(result => {
        res.status(200).send({
            message: "Deleted device retrieved successfully",
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