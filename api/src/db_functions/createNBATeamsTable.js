const mysql = require("mysql");
const axios = require("axios");

const connection = mysql.createConnection({
    host: "localhost",
    user: "nbadeveloper",
    password: "846043ant;",
    database: "nbatest"
});

connection.connect((err) => {
    if (err){
        console.error("Create NBA Teams - Error w/ connection!");
        throw err;
    }
    console.log(`Create NBA Teams - Made successful connection to DB.`)
});

//Will be populated by createNBATeamsTable in Nest 1
var nbaTeams;

/* Creates a MYSQL Table that will display all of the 30 standard regular NBA Teams.
 * Knicks, Bulls, Lakers, Magic, Hawks, Celtics, Suns, Pelicans, Thunder, Kings, Warriors, etc..
 * Nest 1: Connect to API to gather information on NBA teams. Alternative: Connect to data.nba.net and get data from there.
 */
function createNBATeamsTable(){
    //Nest 1: API Connection
    axios.get("http://localhost:8181/teams")
        .then((teams) => {
            //If we get a 200 status connection, proceed.
            if (teams.status === 200) {
                //Populate our previously declared nbaTeams variable with an array of teams.
                nbaTeams = teams.data;

                //Create a prepared query, "??" will be populated by an array full of column names.
                var nbaTeamsTableQuery = `CREATE TABLE IF NOT EXIST nba_teams
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

                //Create a variable that will give us the column names for our prepared query statement.
                //Object.keys will return the column names for our nba teams data gathered by our API get call.
                var teamColumnNames = Object.keys(nbaTeams[0]);
                
                //Perform our prepared query statement.
                connection.query(nbaTeamsTableQuery, teamColumnNames, (error, result, fields) => {
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


function populateTeamsTable(){
    connection.query("SELECT 1 FROM nba_team LIMIT 1;", (error, result, fields) => {
        console.log(typeof(result));
    })
}

populateTeamsTable()

connection.end();