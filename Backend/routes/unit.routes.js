module.exports = app => {

    const unit = require('../controllers/unit.controller');
    var router = require("express").Router();

    //create a new unit
    router.post('/',unit.create);

    //get all units
    router.get('/',unit.findAll);

    //get a unit by id
    router.get('/:id',unit.findOne);

    //update a unit with id
    router.put('/:id',unit.update);

    //soft delete a unit with id
    router.delete('/:id',unit.delete);

    //retrieve all deleted units
    router.get('/deleted/all',unit.findAllDeleted);

    //restore the deleted unit with id
    // router.put('/deleted/:id',unit);





    app.use('/api/units',router);

    
};