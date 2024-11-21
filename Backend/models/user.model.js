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
            allowNull: false
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
        department_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'department',
                key: 'department_id'
            }
        },
        serial_number: {
            type: Sequelize.STRING,
            references: {
                model: 'assets', // Ensure 'assets' is the correct table name
                key: 'serial_number'
            }
        }
    }, {
        tableName: 'users',
        indexes: [
            { fields: ['email'], unique: true },
            { fields: ['status'] }
        ]
    });

    // Define Associations
    User.associate = models => {
        User.belongsTo(models.Department, { foreignKey: 'department_id', as: 'department' });
        User.hasMany(models.Asset, { foreignKey: 'serial_number', as: 'assets' });
    };

    return User;
};
