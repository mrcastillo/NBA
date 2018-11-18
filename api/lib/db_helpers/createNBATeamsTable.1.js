"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.populateNBATeamsTable = populateNBATeamsTable;
exports.createNBATeamsTable = createNBATeamsTable;

var _axios = _interopRequireDefault(require("axios"));

var _lodash = _interopRequireDefault(require("lodash"));

/* 1. See if the table is already created, if the table is not created, then create the table.
*   2. Send API request to teams route, this will get information for all standard NBA teams.
*
*
*/
//Will be populated by createNBATeamsTable in Nest 1
var nbaTeams;
/* Creates a MYSQL Table that will display all of the 30 standard regular NBA Teams.
 * Knicks, Bulls, Lakers, Magic, Hawks, Celtics, Suns, Pelicans, Thunder, Kings, Warriors, etc..
 * Nest 1: Connect to API to gather information on NBA teams. Alternative: Connect to data.nba.net and get data from there.
 */

var checkIfTableExistQuery = "SELECT 1 FROM nba_teams LIMIT 1";

function populateNBATeamsTable(connection) {
  return new Promise(function (resolve, reject) {
    _axios.default.get("http://localhost:8181/teams").then(function (teams) {
      if (teams.status === 200) {
        nbaTeams = teams.data;
        var teamColumnNames = Object.keys(nbaTeams[0]); //We need to know what is the name of the last column in our NBA teams Table
        //We use the teamColumnNames variable from before
        //Gets the last index of the teamColumnNames and returns the name of the last element in the array
        //We will use this for our query to know when to not add a comma "," to our query or mysql will return an error

        var nbaTeamsTableLastColumnName = teamColumnNames[teamColumnNames.lastIndexOf(teamColumnNames[teamColumnNames.length - 1])]; //Start the query to populate and insert all 30 standard NBA teams

        var nbaTeamsPopulateQuery = "";

        _lodash.default.each(nbaTeams, function (team) {
          nbaTeamsPopulateQuery += "INSERT INTO nba_teams (";

          _lodash.default.each(teamColumnNames, function (columnName) {
            if (columnName === nbaTeamsTableLastColumnName) {
              nbaTeamsPopulateQuery += "".concat(columnName);
              nbaTeamsPopulateQuery += ") VALUES (";
            } else {
              nbaTeamsPopulateQuery += "".concat(columnName, ", ");
            }
          });

          nbaTeamsPopulateQuery += "".concat(team.isNBAFranchise, ", ");
          nbaTeamsPopulateQuery += "".concat(team.isAllStar, ", ");
          nbaTeamsPopulateQuery += "'".concat(team.city, "', ");
          nbaTeamsPopulateQuery += "'".concat(team.altCityName, "', ");
          nbaTeamsPopulateQuery += "'".concat(team.fullName, "', ");
          nbaTeamsPopulateQuery += "'".concat(team.tricode, "', ");
          nbaTeamsPopulateQuery += "".concat(team.teamId, ", ");
          nbaTeamsPopulateQuery += "'".concat(team.nickname, "', ");
          nbaTeamsPopulateQuery += "'".concat(team.urlName, "', ");
          nbaTeamsPopulateQuery += "'".concat(team.confName, "', ");
          nbaTeamsPopulateQuery += "'".concat(team.divName, "'");
          nbaTeamsPopulateQuery += "); ";
        }); //END
        //START


        connection.query("".concat(nbaTeamsPopulateQuery), function (error, result, fields) {
          if (!error) {
            resolve(result);
          } else {
            reject(error);
          }
        }); //END
      }
    });
  });
}

function createNBATeamsTable(connection) {
  return new Promise(function (resolve, reject) {
    connection.query(checkIfTableExistQuery, function (err, tableExist) {
      if (err) {
        console.log("--Creating create nba_teams table....");

        _axios.default.get("http://localhost:8181/teams").then(function (teams) {
          if (teams.status === 200) {
            nbaTeams = teams.data;
            var teamColumnNames = Object.keys(nbaTeams[0]); //Create Columns

            var nbaTeamsTableQuery = "CREATE TABLE nba_teams\n                        (\n                            id INT NOT NULL AUTO_INCREMENT,\n                            ?? BOOL,\n                            ?? BOOL,\n                            ?? VARCHAR(60),\n                            ?? VARCHAR(20),\n                            ?? VARCHAR(60),\n                            ?? VARCHAR(5),\n                            ?? INT,\n                            ?? VARCHAR(20),\n                            ?? VARCHAR(20),\n                            ?? VARCHAR(12),\n                            ?? VARCHAR(20),\n                            KEY(id)\n                        );"; //Create Columns End
            //Execute Query

            connection.query(nbaTeamsTableQuery, teamColumnNames, function (error, result) {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            });
          }
        });
      } else {
        reject("--Table nba_teams exist already.");
      }
    });
  });
}