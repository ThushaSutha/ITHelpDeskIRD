module.exports = (sequelize ,Sequelize) => {
    const serviceCompany = sequelize.define('company', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false
        },
        address:{
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        service_start: {
            type: Sequelize.DATE,
            allowNull: false
        },
        service_end: {
            type: Sequelize.DATE,
            allowNull: true
        }

    },{
        tableName:'service_companies',
        timestamps: true
    });

    return serviceCompany;
};