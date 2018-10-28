//err.stack - shows error message.
//connection.threadId - threadId for the mysql connection.
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "nbadeveloper",
    password: "846043ant;",
    database: "nbatest"
});

export const connect = (callback) => {
	connection.connect((err) => {
		if(err){
            console.error(`Error 001: There was an error connecting to the database. \n${err.stack}`);
            return callback(err);
		}
		return callback(connection);
	});
}