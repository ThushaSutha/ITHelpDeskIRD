module.exports = app => {

    const region = require('../controllers/region.controller');
    var router = require("express").Router();

    //create a new region
    router.post('/',region.create);

    //get all regions
    router.get('/',region.findAll);

    //get a region by id
    router.get('/:id',region.findOne);

    //update a region with id
    router.put('/:id',region.update);

    //soft delete a region with id
    router.delete('/:id',region.delete);

    //retrieve all deleted regions
    router.get('/deleted/all',region.findAllDeleted);

    //restore the deleted region with id
    // router.put('/deleted/:id',region);





    app.use('/api/regions',router);

    
};