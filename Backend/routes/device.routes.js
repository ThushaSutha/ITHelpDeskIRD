module.exports = app => {

    const device = require('../controllers/device.controller');
    var router = require("express").Router();

    //create a new device
    router.post('/',device.create);

    //get all categories
    router.get('/',device.findAll);

    //get a device by id
    router.get('/:id',device.findOne);

    //update a device with id
    router.put('/:id',device.update);

    //soft delete a device with id
    router.delete('/:id',device.delete);

    //retrieve all deleted devices
    router.get('/deleted/all',device.findAllDeleted);

    //restore the deleted device with id
    // router.put('/deleted/:id',device);





    app.use('/api/devices',router);

    
};