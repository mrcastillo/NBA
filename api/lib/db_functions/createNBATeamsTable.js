"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
        console.error("Create NBA Teams - Error w/ connection!");
        throw err;
    }
    console.log("Create NBA Teams - Made successful connection to DB.");
});

//Will be populated by createNBATeamsTable in Nest 1
var nbaTeams;

/* Creates a MYSQL Table that will display all of the 30 standard regular NBA Teams.
 * Knicks, Bulls, Lakers, Magic, Hawks, Celtics, Suns, Pelicans, Thunder, Kings, Warriors, etc..
 * Nest 1: Connect to API to gather information on NBA teams. Alternative: Connect to data.nba.net and get data from there.
 */
function createNBATeamsTable() {
    //Nest 1: API Connection
    axios.get("http://localhost:8181/teams").then(function (teams) {
        //If we get a 200 status connection, proceed.
        if (teams.status === 200) {
            //Populate our previously declared nbaTeams variable with an array of teams.
            nbaTeams = teams.data;

            //Create a prepared query, "??" will be populated by an array full of column names.
            var nbaTeamsTableQuery = "CREATE TABLE IF NOT EXIST nba_teams\n                (\n                    ?? BOOL,\n                    ?? BOOL,\n                    ?? VARCHAR(60),\n                    ?? VARCHAR(20),\n                    ?? VARCHAR(60),\n                    ?? VARCHAR(4),\n                    ?? INT,\n                    ?? VARCHAR(20),\n                    ?? VARCHAR(20),\n                    ?? VARCHAR(12),\n                    ?? VARCHAR(20)\n                );";

            //Create a variable that will give us the column names for our prepared query statement.
            //Object.keys will return the column names for our nba teams data gathered by our API get call.
            var teamColumnNames = Object.keys(nbaTeams[0]);

            //Perform our prepared query statement.
            connection.query(nbaTeamsTableQuery, teamColumnNames, function (error, result, fields) {
                if (error) throw error;
                console.log(result);
                connection.end();
            });
        }
        //If we get an error connecting to API, output error.
        else {
                console.error("test.js error " + teams.statusText);
                connection.end();
            }
    });
}

function populateTeamsTable() {
    connection.query("SELECT 1 FROM nba_team LIMIT 1;", function (error, result, fields) {
        console.log(typeof result === "undefined" ? "undefined" : _typeof(result));
    });
}

populateTeamsTable();

connection.end();