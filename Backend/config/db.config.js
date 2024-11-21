module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    TIMEZONE: '+05:30',
    DB: "ticket_system",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};