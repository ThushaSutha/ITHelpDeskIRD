module.exports = (sequelize, Sequelize) => {
    const Ticket_Image = sequelize.define('ticket_images', {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        path:{
            type:Sequelize.STRING,
            allowNull:false
        },
        ticket_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
            references:{
                model:'tickets',
                key:'id'
            },
            
        }

    },{
        tableName:'ticket_images',
        timeStamps:true,
        paranoid:true
    });

    return Ticket_Image;
}