const config = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,{
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.department = require("../models/department.model")(sequelize,Sequelize);
db.user = require("../models/user.model")(sequelize,Sequelize);

db.department.hasMany(db.user,{foreignKey: 'department_id'});
db.user.belongsTo(db.department,{foreignKey: 'department_id'});

module.exports = db;