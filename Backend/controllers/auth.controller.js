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
        unit_id: req.body.unit_id
    })
    .then(user => {
        res.status(201).send({
            message: "User was created successfully!",
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
exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(404).send({ message: "User Not Found." });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ accessToken: null, message: "Invalid Password!" });
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
            algorithm: 'HS256',
            expiresIn: 3600, // 1 hour
        });

        const unit = await user.getUnit();
        console.log(unit);
        
        res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            unit: unit ? unit.name : null,
            accessToken: token,
        });
    } catch (err) {
        res.status(500).send({ message: err.message || "Some error occurred while signing in"});
        // Detect specific errors
        // if (err.name === "SequelizeConnectionError") {
        //     res.status(500).send({ message: "Database connection error. Please try again later." });
        // } else if (err.message.includes("ENOTFOUND") || err.message.includes("ECONNREFUSED")) {
        //     res.status(500).send({ message: "Internet connectivity issue. Please check your connection." });
        // } else {
        //     // General error handling
        //     res.status(500).send({ message: "An unexpected error occurred. Please try again." });
        // }
    }
};

