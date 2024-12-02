module.exports = (sequelize, Sequelize) =>{
    const Asset = sequelize.define('Asset', {
        
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        serial_number:{
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,

        },
        model:{
            type: Sequelize.STRING,
            allowNull: false
        },
        brand:{
            type: Sequelize.STRING,
            allowNull: false
        },
        purchase_date:{
            type: Sequelize.DATE,
            allowNull: false
        },
        warranty_exp: {
            type: Sequelize.DATE,
            allowNull: false
        },
        assigned_to:{
            type: Sequelize.INTEGER,
            references:{
                model: 'users',
                key: 'emId'
            }
        },
        service_company_id:{
            type: Sequelize.INTEGER,
            references:{
                model: 'service_companies',
                key: 'id'
            }
        }
    },{
        tableName: 'assets',
        timestamps: true,
        paranoid: true
    });

    return Asset;

};
