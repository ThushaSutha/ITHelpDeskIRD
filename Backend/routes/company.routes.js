module.exports = app => {

    const company = require('../controllers/company.controller');
    var router = require("express").Router();

    //create a new company
    router.post('/',company.create);

    //get all categories
    router.get('/',company.findAll);

    //get a company by id
    router.get('/:id',company.findOne);

    //update a company with id
    router.put('/:id',company.update);

    //soft delete a company with id
    router.delete('/:id',company.delete);

    //retrieve all deleted companies
    router.get('/deleted/all',company.findAllDeleted);

    //restore the deleted company with id
    // router.put('/deleted/:id',company);
    app.use('/api/companies',router);

};