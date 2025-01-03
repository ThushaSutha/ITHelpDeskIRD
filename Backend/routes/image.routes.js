module.exports = app => {

    const image = require('../controllers/image.controller');
    var router = require("express").Router();

    //create a new image
    router.post('/',image.create);

    //get all images
    router.get('/',image.findAll);

    //get a image by id
    router.get('/:id',image.findOne);

    //update a image with id
    router.put('/:id',image.update);

    //soft delete a image with id
    router.delete('/:id',image.delete);

    //retrieve all deleted images
    router.get('/deleted/all',image.findAllDeleted);

    //restore the deleted image with id
    // router.put('/deleted/:id',image);





    app.use('/api/images',router);

    
};