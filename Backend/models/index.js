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
        },
        timezone: config.TIMEZONE
    }
);


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//region model
db.region = require("../models/region.model")(sequelize, Sequelize);
db.unit = require("../models/unit.model")(sequelize,Sequelize);
db.user = require("../models/user.model")(sequelize,Sequelize);
db.ticket = require("../models/ticket.model")(sequelize, Sequelize);
db.company = require("../models/company.model")(sequelize, Sequelize)
db.asset = require("../models/asset.model")(sequelize, Sequelize);


//relationship list 
db.region.hasMany(db.unit, { foreignKey: "region_id" });
db.unit.belongsTo(db.region,{ foreignKey: 'region_id' ,as : 'region' });

db.unit.hasMany(db.user, { foreignKey: 'unit_id', as: 'users' }); // A Unit can have many Users
db.user.belongsTo(db.unit, { foreignKey: 'unit_id', as: 'units' }); // A User belongs to a Unit


//ticket table relationship
// db.user.hasMany(db.ticket,{foreignKey: 'user_id'});
// db.ticket.belongsTo(db.user,{foreignKey: 'user_id'});
// db.ticket.belongsTo(db.user,{foreignKey:'assigned_to'});

//asset table relationship
// db.user.hasMany(db.asset,{foreignKey: 'assigned_to'});
// db.asset.belongsTo(db.user,{foreignKey: 'serial_number'});
// db.asset.hasMany(db.company,{foreignKey: 'service_company_id'});
// db.company.belongsTo(db.asset,{foreignKey: 'serial_number'});

module.exports = db;