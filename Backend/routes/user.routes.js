const {authJwt} = require("../middleware");
const controller = require("../controllers/user.controller");

// module.exports = function(app){
//     app.use(function(req,res,next){
//         res.header(
//             "Access-Controller-Allow-Header",
//             "x-access-token, origin,Content-Type,Accept"
//         );
//         next();
//     });

//     app.get("/api/test/all",controller.allAccess);

//     app.get(
//         "/api/test/user",
//         [authJwt.verifyToken],
//         controller.userBoard
//     );

//     app.get(
//         "/api/test/mod",
//         [authJwt.verifyToken, authJwt.isModerator],
//         controller.moderatorBoard
//     );

//     app.get(
//         "/api/test/admin",
//         [authJwt.verifyToken,authJwt.isAdmin],
//         controller.adminBoard
//     );
// };

module.exports = app => {
    app.use(function(req,res,next){
        res.header(
            "Access-Controller-Allow-Header",
            "x-access-token, origin,Content-Type,Accept"
        );
        next();
    });

    const user = require('../controllers/user.controller');
    var router = require("express").Router();

    //app.get(
        //         "/api/test/admin",
        //         [authJwt.verifyToken,authJwt.isAdmin],
        //         controller.adminBoard
        //     );

    // retrieve all users
    router.get("/", [authJwt.verifyToken,authJwt.isAdmin] ,user.getUsers);

    //get a user by id
    router.get("/:id", [authJwt.verifyToken,authJwt.isAdmin] ,user.findOne);
    
    //get a user by role
    router.get("/role/all", [authJwt.verifyToken,authJwt.isItInChargeOrAdmin] ,user.findByRole);

    //update a ticket with id
    router.put("/:id", [authJwt.verifyToken,authJwt.isAdmin] ,user.update);

    //soft delete a user with id
    router.delete("/:id", [authJwt.verifyToken,authJwt.isAdmin] ,user.delete);

    //retrieve all deleted users
    router.get("/deleted/all", [authJwt.verifyToken,authJwt.isAdmin] ,user.findAllDeleted);

    //restore the deleted user with id
    router.put("/deleted/:id", [authJwt.verifyToken,authJwt.isAdmin] ,user.restoreUser);
    





    app.use('/api/users',router);

    
};