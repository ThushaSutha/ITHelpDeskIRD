module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(255),
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        role:{
            type: Sequelize.STRING(20),
            allowNull: false,
            defaultValue: 'staff'
        },
        password: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        status: {
            type: Sequelize.TINYINT,
            allowNull: false,
            defaultValue: 0

        },
        unit_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'units',
                key: 'id'
            }
        },
        serial_number: {
            type: Sequelize.STRING,
            references: {
                model: 'assets', 
                key: 'serial_number'
            }
        }
    }, {
        tableName: 'users',
        indexes: [
            { fields: ['email'], unique: true },
            { fields: ['status'] }
        ],
        timestamps: true,
        paranoid: true
    });

    // Define Associations
    User.associate = models => {
        User.belongsTo(models.Unit, { foreignKey: 'unit_id', as: 'department' });
        User.hasMany(models.Asset, { foreignKey: 'serial_number', as: 'assets' });
    };

    return User;
};
