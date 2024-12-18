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
        status:{
            type: Sequelize.TINYINT,
            allowNull:false,
            defaultValue: 0
        },
        priority:{
            type: Sequelize.TINYINT,
            allowNull: false,
            defaultValue:0
        },
        user_id:{
            type: Sequelize.INTEGER,
            references:{
                model: 'users',
                key: 'emId'
            }
        },
        assigned_to:{
            type: Sequelize.INTEGER,
            references:{
                model: 'users',
                key: 'emId'
            }
        },
    },{
        tableName:'tickets',
        timestamps: true,
        paranoid: true

    });

    return Ticket;
};