import axios from "axios";
import _ from "lodash";

const tableName = "nba_teams"

export class NBAteams{
    constructor(db){
        this.db = db;
    }
    createNBATeamsTable(){
        return new Promise((resolve, reject) => {
            this.db.schema.createTable(tableName, (table) => {
                table.boolean("isNBAFranchise");
                table.boolean("isAllStar");
                table.string("city");
                table.string("altCityName");
                table.string("fullName");
                table.string("tricode");
                table.integer("teamId").primary();
                table.string("nickname");
                table.string("urlName");
                table.string("confName");
                table.string("divName");
            })
            .then((result) => {
                console.log(result);
                console.log("nba_teams table created");
                resolve(true);
            })
            .catch((err) => {
                reject(err);
            });
        });
    };

    populateNBATeamsTable() {
        return new Promise((resolve, reject) => {
            axios.get("http://localhost:8181/teams")
            .then((teams) => {
                const nbaTeams = teams.data;
                console.log(nbaTeams);
                
                this.db(tableName)
                .insert(nbaTeams)
                .then((result) => {
                    console.log(result)
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    createAndPopulateNBATeams() {
        return new Promise((resolve, reject) => {
            this.createNBATeamsTable()
            .then((result) => {
                console.log(result);
                this.populateNBATeamsTable()
                    .then((result) => {
                        console.log(result);
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            })
            .catch((err) => {
                console.error(err);
            })
        });
    }

    getNBATeamByName(name) {
        return new Promise((resolve, reject) => {
            this.db(tableName)
            .where({ "urlName": name })
            .then((rows) => {
                resolve(rows)
            })
            .catch((err) => {
                reject(err);
            })
        });
    }

    getNBATeamId(id) {
        return new Promise((resolve, reject) => {
            this.db(tableName)
            .where({"teamId" : id})
            .then((rows) => {
                resolve(rows);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    getIDByTeamName(name){
        return new Promise((resolve, reject) => {
            this.getNBATeamByName(name)
            .then((row) => {
                const teamId = row[0].teamId
                resolve(teamId);
            })
            .catch((err) => {
                reject(err);
            })
        });
    };

    
} 
