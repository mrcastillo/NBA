'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Sequelize = require('sequelize');
var sequelize = new Sequelize('mysql_database', 'acastillo', 'Appsteam3$', {
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

var connect = exports.connect = function connect(callback) {
    sequelize.authenticate().then(function () {
        callback(sequelize);
    }).catch(function (err) {
        console.error('Error 001: There was an error connecting to the database. \n' + err);
        return;
    });
};