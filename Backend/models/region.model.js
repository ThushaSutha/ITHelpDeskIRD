module.exports = (sequelize , Sequelize) => {
    const Region = sequelize.define('region', {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false
        }
    },{
        tableName: 'regions',
        timestamps: true,
        paranoid: true
    });

    return Region;
};