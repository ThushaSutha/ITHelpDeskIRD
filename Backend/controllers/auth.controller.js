const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword, 
        role: req.body.role,
        status: req.body.status,
        department_id: req.body.department_id
    })
    .then(user => {
        res.status(201).send({
            message: "User was registered successfully!",
            user: {
                id: user.user_id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while registering the user."
        });
    });
};


// sign in function
exports.signin = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if (!user) {
            return res.status(404).send({
                message: "User Not found."
            });
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id },
            config.secret, {
                algorithm: 'HS256',
                expiresIn: 3600  // 1 hour  
            });

        // Assuming role/authorities are needed
        user.getDepartment().then(department => {
            res.status(200).send({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: department ? department.department_name : null, // Include department if needed
                accessToken: token
            });
        }).catch(err => {
            res.status(500).send({
                message: "Error retrieving user department"
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
