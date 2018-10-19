const mysql = require("mysql");
const axios = require("axios");
const _ = require("lodash");

const connection = mysql.createConnection({
    host: "localhost",
    user: "nbadeveloper",
    password: "846043ant;",
    database: "nbatest",
    multipleStatements: true
});

connection.connect((err) => {
    if (err) {
        console.error("Create NBA Teams - Error w/ connection!");
        throw err;
    }
    console.log(`Create NBA Teams - Made successful connection to DB.`)
});

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
function createNBATeamsTable() {
    //Check to see if table exist, if it does not, run the script, if it does, do not run script.
    connection.query(`SELECT 1 FROM nba_teams LIMIT 1`, (err, result, fields) => {
        if (err) { //If there is an error, it means that the table does not exist yet.
            console.log(`Warning: Did not find nba_teams table in database.\nCreating new table....`);

            //Nest 1: API Connection
            //Now that we know that no table exist, connect to the API.
            axios.get("http://localhost:8181/teams")
                .then((teams) => {
                    //If we get a 200 status connection, proceed.
                    if (teams.status === 200) {
                        //Populate our previously declared nbaTeams variable with an array of teams.
                        nbaTeams = teams.data;

                        //Create a variable that will give us the column names for our prepared query statement.
                        //Object.keys will return the column names for our nba teams data gathered by our API get call.
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
                        var nbaTeamsPopulateQuery = "";

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


                        //console.log(nbaTeamsPopulateQuery);

                        //Create a prepared query, "??" will be populated by an array full of column names.
                        var nbaTeamsTableQuery = `CREATE TABLE nba_teams
                        (
                            ?? BOOL,
                            ?? BOOL,
                            ?? VARCHAR(60),
                            ?? VARCHAR(20),
                            ?? VARCHAR(60),
                            ?? VARCHAR(4),
                            ?? INT,
                            ?? VARCHAR(20),
                            ?? VARCHAR(20),
                            ?? VARCHAR(12),
                            ?? VARCHAR(20)
                        );`;

                        connection.query(nbaTeamsTableQuery, teamColumnNames, (error, result, fields) => {
                            if (error) {
                                console.error(`There was an error creating the nba_teams table.\n${error}`)
                            }
                            else {
                                console.log(`Created nba_teams table in mysql DB.`);
                                connection.query(nbaTeamsPopulateQuery, (error, result, fields) => {
                                    if (error) {
                                        console.log(`There was an error populating the nba_teams table.\n${error}`);
                                        connection.end();
                                    }
                                    else {
                                        console.log(`nba_teams table has been added and populated!`);
                                        connection.end();
                                    }
                                });
                            }
                        });
                    }
                    //If we get an error connecting to API, output error.
                    else {
                        console.error(`Error connecting to the NBA teams api route.\n${teams.statusText}`);
                        connection.end();
                    }
                }
            )}
        else 
        {
            console.log(`Found nba_teams table in database.\nPlease remove nba_teams table and rerun script.`);
            connection.end();
        }
    });
}


//populateTeamsTable()
createNBATeamsTable();