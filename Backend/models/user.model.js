module.exports = (sequelize,Sequelize)=>{
    const User = sequelize.define("user",{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: Sequelize.STRING(255),
            allowNull: false
        },
        email:{
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true
        },
        password:{
            type: Sequelize.STRING(255),
            allowNull: false
        },
        role:{
            type:Sequelize.STRING(100),
            allowNull:false
        },
        status:{
            type:Sequelize.TINYINT
        },
        department_id:{
            type: Sequelize.INTEGER,
            references: {
                model: 'department',
                key: 'department_id'
            }
        }
    },{
        tableName:'users',
        timestamps: true

    });

    return User;
};




