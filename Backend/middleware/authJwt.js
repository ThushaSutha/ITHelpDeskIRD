const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  console.log(token);
  

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
        console.log(err);
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    console.log(decoded.id);
    
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (!user) {
      return res.status(404).send({
        message: "User Not found."
      });
    }

    if (user.role === "admin") {
      next();
      return;
    }

    res.status(403).send({
      message: "Require Admin Role!"
    });
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (!user) {
      return res.status(404).send({
        message: "User Not found."
      });
    }

    if (user.role === "moderator") {
      next();
      return;
    }

    res.status(403).send({
      message: "Require Moderator Role!"
    });
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (!user) {
      return res.status(404).send({
        message: "User Not found."
      });
    }

    if (user.role === "moderator" || user.role === "admin") {
      next();
      return;
    }

    res.status(403).send({
      message: "Require Moderator or Admin Role!"
    });
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
};

module.exports = {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin
};
