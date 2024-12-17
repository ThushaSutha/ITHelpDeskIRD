module.exports = (sequelize,Sequelize) => {
    const Category = sequelize.define('categories',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:Sequelize.STRING,
            allowNull:false
        },
        description:{
            type:Sequelize.STRING,
            allowNull:true
        }
    },{
        tableName:'categories',
        timestamps:true,
        paranoid:true
    });

    return Category
};