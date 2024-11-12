module.exports = (sequelize ,Sequelize)=>{
    const Department = sequelize.define("department",{
        department_id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        department_name:{
            type: Sequelize.STRING(255),
            allowNull: false
        }
    },{
        tableName: 'department',
        timestamps:true
    });

    return Department;
};