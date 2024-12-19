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
db.category = require("../models/category.model")(sequelize, Sequelize);
db.ticket_image = require("../models/ticketImage.model")(sequelize, Sequelize);
db.ticket_comment = require("../models/ticketComment.model")(sequelize, Sequelize);
db.device = require("../models/device.model")(sequelize, Sequelize);


//relationship list 
db.region.hasMany(db.unit, { foreignKey: "region_id" });
db.unit.belongsTo(db.region,{ foreignKey: 'region_id' ,as : 'region' });

db.unit.hasMany(db.user, { foreignKey: 'unit_id', as: 'users' }); 
db.user.belongsTo(db.unit, { foreignKey: 'unit_id', as: 'units' });

db.category.hasMany(db.ticket,{foreignKey: "category_id"});
db.ticket.belongsTo(db.category,{foreignKey: "category_id",as : 'category'});

db.ticket.hasMany(db.ticket_image,{foreignKey:"ticket_id"});
db.ticket_image.belongsTo(db.ticket,{foreignKey:"ticket_id",as : 'ticket'});

db.company.hasMany(db.device,{foreignKey:'company_id'});
db.device.belongsTo(db.company,{foreignKey:'company_id', as : 'company'});




module.exports = db;