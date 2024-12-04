module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        emId:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        employeeId:{
            type:Sequelize.STRING(255),
            allowNull: false
        },
        // emId: {
        //     type: Sequelize.STRING,
        //     validate: {
        //         isUnique: async function (value) {
        //             const existing = await User.findOne({ where: { emId: value } });
        //             if (existing) {
        //                 throw new Error('This emId already exists.');
        //             }
        //         },
        //     },

        // },
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
        contact: {
            type: Sequelize.STRING, // Changed to STRING for better handling of phone numbers
            allowNull: false,
            
        },
        designation: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        firstLogin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        setExpiryDate: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        role: {
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
        User.belongsTo(models.Unit, { foreignKey: 'unit_id', as: 'units' });
        User.hasMany(models.Asset, { foreignKey: 'serial_number', as: 'assets' });
    };

    return User;
};
