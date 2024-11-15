module.exports = (sequelize, Sequelize)=>{
    const Ticket = sequelize.define('tickets',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title:{
            type: Sequelize.STRING(255),
            allowNull: false
        },
        description:{
            type: Sequelize.TEXT,
            allowNull: false
        },
        status_id:{
            type: Sequelize.TINYINT,
            allowNull:false,
            default: 0
        },
        priority:{
            type: Sequelize.TINYINT,
            allowNull: false,
            default:0
        },
        user_id:{
            type: Sequelize.INTEGER,
            references:{
                model: 'users',
                key: 'id'
            }
        }
    })
}