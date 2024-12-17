module.exports = (sequelize,Sequelize)=>{
    const Ticket_Categories = sequelize.define('ticket_categories',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        selfGranted: {
            type:Sequelize.BOOLEAN,
            defaultValue: false
        }
        
    },{
        tableName:'ticket_categories',
        timestamps:true,
        paranoid:true
    });

    return Ticket_Categories;
}