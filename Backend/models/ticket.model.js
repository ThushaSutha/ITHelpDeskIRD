module.exports = (sequelize, Sequelize)=>{
    const Ticket = sequelize.define('tickets',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        device_id:{
            type: Sequelize.INTEGER,
            references:{
                model:'devices',
                key:'id'
            }
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
            defaultValue:0 // 0- low, 1- medium, 2- high
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
        serial_no:{
            type: Sequelize.STRING(100),
            allowNull:true
        },
        model:{
            type: Sequelize.STRING(50),
            allowNull:true
        },
        brand:{
            type: Sequelize.STRING(50),
            allowNull:true
        },

        category_id:{
            type: Sequelize.INTEGER,
            references:{
                model: 'categories',
                key: 'id'
            }   
        },
    },{
        tableName:'tickets',
        timestamps: true,
        paranoid: true

    });

    return Ticket;
};