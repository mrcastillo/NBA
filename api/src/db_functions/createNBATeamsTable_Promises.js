import mysql from "mysql";
import axios from "axios";
import _ from "lodash";

const connection = mysql.createConnection({
    host: "localhost",
    user: "nbadeveloper",
    password: "846043ant;",
    database: "nbatest",
    multipleStatements: true
});


connection.connect((err) => {
    if(err) throw err;
});


connection.query(`SELECT 1 FROM nba_teams LIMIT 1`, (err, result, fields) => {
    if(err) throw err;
    console.log(result);
});

connection.end();


/*
import mysql from "mysql";
import axios from "axios";
import _ from "lodash";

const connection = mysql.createConnection ({
    host: "localhost",
    user: "nbadeveloper",
    password: "846043ant;",
    database: "nbatest",
    multipleStatements: true
});

var nbaTeams;

async function createNBATeamsTable() {

    try {
        await connection.connect();
        nbaTeams = await axios.get("http://localhost:8181/teams");

        //Create a variable that will give us the column names for our prepared query statement.
        //Object.keys will return the column names for our nba teams data gathered by our API get call.
        const teamColumnNames = Object.keys(nbaTeams[0]);

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
        ]

        var nbaTeamsPopulateQuery = `INSERT INTO nba_teams (`;

        //Add the column names to the INSERT query
        _.each(teamColumnNames, (columnName) => {
            if (columnName === nbaTeamsTableLastColumnName) {
                nbaTeamsPopulateQuery += `${columnName}`;
            } else {
                nbaTeamsPopulateQuery += `${columnName}, `;
            }
        })

        //Add the VALUES tag to the query.
        nbaTeamsPopulateQuery += `) VALUES (`;

        _.each(nbaTeams, (team) => {
            _.each(teamColumnNames, (columnNames) => {
                nbaTeamsPopulateQuery
            });
        });
        nbaTeamsPopulateQuery += `)`;

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

        const insertNBATeamsTable = await connection.query(nbaTeamsTableQuery, teamColumnNames);

        console.log(insertNBATeamsTable);

    } catch(error) {
        console.error(`There was an error.\n${error}`)
    }

}

createNBATeamsTable();

*/