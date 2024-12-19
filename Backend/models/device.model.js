module.exports = (sequelize, Sequelize ) =>{
    const Device = sequelize.define('Device', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        brand:{
            type: Sequelize.STRING,
            allowNull: true
        },
        model:{
            type: Sequelize.STRING,
            allowNull: true
        },
        serial_number:{
            type: Sequelize.STRING,
            allowNull: true
        },
        device_type:{
            type: Sequelize.STRING,
            allowNull: false
        },
        purchase_date:{
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        warranty_expiration_date:{
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        company_id:{
            type: Sequelize.INTEGER,
            references:{
                model: 'service_companies',
                key: 'id'
            }
        },
        user_id:{
            type:Sequelize.INTEGER,
            references:{
                model:'users',
                key:'emId'
            }
        }
    },{
        tableName:'devices',
        timestamps: true,
        paranoid: true
    });

    return Device;
}