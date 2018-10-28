"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = void 0;

require("reflect-metadata");

var _typeorm = require("typeorm");

var _nbaTeams = require("./entities/nbaTeams");

var connect = function connect(callback) {
  var connection = (0, _typeorm.createConnection)({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "nbadeveloper",
    password: "846043ant;",
    database: "nbatest",
    entities: [__dirname + "/entities/*.ts"],
    synchronize: true,
    logging: true
  }).then(function (connection) {
    if (connection.isConnected) {
      callback(connection);
    }
  }).catch(function (error) {
    callback(error);
  });
};

exports.connect = connect;