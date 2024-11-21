module.exports = (sequelize , Sequelize) => {
    const Unit = sequelize.define('unit', {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false
        },
        region_id:{
            type: Sequelize.INTEGER,
            references:{
                model: 'regions',
                key: 'id'
            }
        }
    },{
        tableName:'units',
        timeStamps: true,
        paranoid: true
    });

    return Unit;
};