const db = require("../models");
const department = db.department;
const User = db.user;

checkDuplicationEmail = (req, res, next) =>{
    User.findOne({
        where:{
            email: req.body.email
        }
    }).then(user=>{
        if(user){
            res.status(400).send({
                message: "Failed! Email is already in use!"
            });
            return;
        }
        next();
    });
};

const verifySignUp = {
    checkDuplicationEmail: checkDuplicationEmail
};

module.exports = verifySignUp;




