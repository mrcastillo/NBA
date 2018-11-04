import axios from "axios";
import _ from "lodash";
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
const checkIfTableExistQuery = `SELECT 1 FROM nba_teams LIMIT 1`;

export function populateNBATeamsTable(connection){
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:8181/teams`)
            .then((teams) => {
                if (teams.status === 200) {
                    nbaTeams = teams.data;

                    var teamColumnNames = Object.keys(nbaTeams[0]);

                    //We need to know what is the name of the last column in our NBA teams Table
                    //We use the teamColumnNames variable from before
                    //Gets the last index of the teamColumnNames and returns the name of the last element in the array
                    //We will use this for our query to know when to not add a comma "," to our query or mysql will return an error
                    var nbaTeamsTableLastColumnName = teamColumnNames[
                        teamColumnNames.lastIndexOf(
                            teamColumnNames[
                            teamColumnNames.length - 1
                            ]
                        )
                    ];

                    //Start the query to populate and insert all 30 standard NBA teams
                    var nbaTeamsPopulateQuery = ``;

                    _.each(nbaTeams, (team) => {
                        nbaTeamsPopulateQuery += `INSERT INTO nba_teams (`

                        _.each(teamColumnNames, (columnName) => {
                            if (columnName === nbaTeamsTableLastColumnName) {
                                nbaTeamsPopulateQuery += `${columnName}`;
                                nbaTeamsPopulateQuery += `) VALUES (`;
                            }
                            else {
                                nbaTeamsPopulateQuery += `${columnName}, `;
                            }
                        });

                        nbaTeamsPopulateQuery += `${team.isNBAFranchise}, `;
                        nbaTeamsPopulateQuery += `${team.isAllStar}, `;
                        nbaTeamsPopulateQuery += `'${team.city}', `;
                        nbaTeamsPopulateQuery += `'${team.altCityName}', `;
                        nbaTeamsPopulateQuery += `'${team.fullName}', `;
                        nbaTeamsPopulateQuery += `'${team.tricode}', `;
                        nbaTeamsPopulateQuery += `${team.teamId}, `;
                        nbaTeamsPopulateQuery += `'${team.nickname}', `;
                        nbaTeamsPopulateQuery += `'${team.urlName}', `;
                        nbaTeamsPopulateQuery += `'${team.confName}', `;
                        nbaTeamsPopulateQuery += `'${team.divName}'`;
                        nbaTeamsPopulateQuery += `); `;
                    });
                    //END


                    //START
                    connection.query(`${nbaTeamsPopulateQuery}`, (error, result, fields) => {
                        if (!error) {
                            resolve(result);
                        }
                        else {
                            reject(error);
                        }
                    });
                    //END
                }
            });
    });
}


export function createNBATeamsTable(connection){
    return new Promise((resolve, reject) => {
        connection.query(checkIfTableExistQuery, (err, tableExist) => {
            if(err){
                console.log("--Creating create nba_teams table....");

                axios.get(`http://localhost:8181/teams`)
                .then((teams) => {
                    if (teams.status === 200) {
                        nbaTeams = teams.data;

                        var teamColumnNames = Object.keys(nbaTeams[0]);

                        //Create Columns
                        var nbaTeamsTableQuery = `CREATE TABLE nba_teams
                        (
                            id INT NOT NULL AUTO_INCREMENT,
                            ?? BOOL,
                            ?? BOOL,
                            ?? VARCHAR(60),
                            ?? VARCHAR(20),
                            ?? VARCHAR(60),
                            ?? VARCHAR(5),
                            ?? INT,
                            ?? VARCHAR(20),
                            ?? VARCHAR(20),
                            ?? VARCHAR(12),
                            ?? VARCHAR(20),
                            KEY(id)
                        );`;
                        //Create Columns End

                        //Execute Query
                        connection.query(nbaTeamsTableQuery, teamColumnNames, (error, result) => {
                            if (error) {
                                reject(error);
                            }
                            else {
                                resolve(result);
                            }
                        });
                    }
                });
            }
            else {
                reject("--Table nba_teams exist already.");
            }
        });
    });
}