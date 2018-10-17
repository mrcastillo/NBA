const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql_database', 'acastillo', 'Appsteam3$', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

export const connect = (callback) => {
    sequelize
    .authenticate()
    .then(() => {
        callback(sequelize);
    })
    .catch( err => {
        console.error(`Error 001: There was an error connecting to the database. \n${err}`);
        return;
    })
}