"use strict";

var mysql = require("mysql");
var axios = require("axios");

var connection = mysql.createConnection({
    host: "localhost",
    user: "nbadeveloper",
    password: "846043ant;",
    database: "nbatest"
});

connection.connect(function (err) {
    if (err) {
        console.error("Error 001: There was an error connecting to the database. \n" + err.stack);
        return;
    }
});

function returnme() {
    return;
}

returnme();

var nbaTeams = {};

function createNBATeamsTable() {
    axios.get("http://localhost:8181/teams").then(function (teams) {
        if (teams.status === 200) {

            nbaTeams = teams.data;

            var nbaTeamsTableQuery = "CREATE TABLE nba_teams\n                (\n                    ?? BOOL,\n                    ?? BOOL,\n                    ?? VARCHAR(60),\n                    ?? VARCHAR(20),\n                    ?? VARCHAR(60),\n                    ?? VARCHAR(4),\n                    ?? INT,\n                    ?? VARCHAR(20),\n                    ?? VARCHAR(20),\n                    ?? VARCHAR(12),\n                    ?? VARCHAR(20)\n\n                )";

            var teamColumnNames = Object.keys(nbaTeams[0]);

            connection.query(nbaTeamsTableQuery, teamColumnNames, function (error, result, fields) {
                if (error) throw error;
                console.log(result);
                connection.end();
            });
        } else {
            console.error("test.js error " + teams.statusText);
            connection.end();
        }
    });
}

createNBATeamsTable();