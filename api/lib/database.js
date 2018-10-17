"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
//err.stack - shows error message.
//connection.threadId - threadId for the mysql connection.
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "nbadeveloper",
  password: "846043ant;",
  database: "nbatest"
});

var connect = exports.connect = function connect(callback) {
  connection.connect(function (err) {
    if (err) {
      console.error("Error 001: There was an error connecting to the database. \n" + err.stack);
      return;
    }
    return callback(connection);
  });
};