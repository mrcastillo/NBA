import "reflect-metadata";
import { createConnection } from "typeorm";
import { nbaTeams } from "./entities/nbaTeams"

export const connect = (callback) => {
    const connection = createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "nbadeveloper",
        password: "846043ant;",
        database: "nbatest",
        entities: [
            __dirname + "/entities/*.ts"
        ],
        synchronize: true,
        logging: true
    })
    .then((connection) => {
        if(connection.isConnected){
            callback(connection);
        }
    })
    .catch((error) => {
        callback(error);
    });
}