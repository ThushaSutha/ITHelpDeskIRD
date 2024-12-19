module.exports = app => {

    const category = require('../controllers/category.controller');
    var router = require("express").Router();

    //create a new category
    router.post('/',category.create);

    //get all categories
    router.get('/',category.findAll);

    //get a category by id
    router.get('/:id',category.findOne);

    //update a category with id
    router.put('/:id',category.update);

    //soft delete a category with id
    router.delete('/:id',category.delete);

    //retrieve all deleted categories
    router.get('/deleted/all',category.findAllDeleted);

    //restore the deleted category with id
    // router.put('/deleted/:id',category);





    app.use('/api/categories',router);

    
};