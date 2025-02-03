// module.exports = app => {


    const {authJwt} = require('../middleware');
    const ticket = require('../controllers/ticket.controller');
    var router = require("express").Router();

    //create a new ticket
    router.post('/',ticket.create);

    //get all tickets
    router.get('/',ticket.findAll);

    //get all tickets with out pagination
    router.get('/all',ticket.findAllWithoutPagination);

    //get a ticket by id
    router.get('/:id',ticket.findOne);

    //get tickets for logged user
    router.get('/log/tickets',ticket.findByUser);

    //update a ticket with id
    router.put('/:id',ticket.update);

    //soft delete a ticket with id
    router.delete('/:id',ticket.delete);

    //retrieve all deleted tickets
    router.get('/deleted/all',ticket.findAllDeleted);

    //restore the deleted ticket with id
    router.put('/deleted/:id',ticket.restoreTicket);






    // app.use('/api/tickets',router);
    module.exports = router

    
// };