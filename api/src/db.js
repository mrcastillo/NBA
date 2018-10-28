import "reflect-metadata";
import { createConnection } from "typeorm";

export const connect = (callback) => {
    const connection = createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "nbadeveloper",
        password: "846043ant;",
        database: "nbatest",
        entities: [
            __dirname + "./entities/*.js"
        ],
        synchronize: true,
        logging: false
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