module.exports = (sequelize, Sequelize) =>{
    const Ticket_comment = sequelize.define('ticket_comments',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        comment:{
            type:Sequelize.TEXT,
            allowNull:false
        },
        ticket_id:{
            type:Sequelize.INTEGER,
            references:{
                model:'tickets',
                key:'id'
            },
        },
        user_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
            references:{
                model:'users',
                key:'emId'
            }
        }
    },{
        tableName:'ticket_comments',
        timeStamps:true,
        paranoid:true
    });

    return Ticket_comment;
}