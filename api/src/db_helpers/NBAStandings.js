import axios from "axios";
import _ from "lodash";

const tableName = "nba_standings";

export class Standings {
    constructor(db) {
        this.db = db;
    }

    createNBAStandingsTable(){
        return new Promise((resolve, reject) => {
            this.db.schema.createTable(tableName, (table) => {
                table.integer("teamId").primary();
                table.integer("win");
                table.integer("loss");
                table.float("winPct");
                table.float("winPctV2");
                table.float("lossPct");
                table.float("lossPctV2");
                table.integer("gamesBehind");
                table.integer("divGamesBehind");
                table.string("clinchedPlayoffsCode");
                table.string("clinchedPlayoffsCodeV2");
                table.string("confRank");
                table.integer("confWin");
                table.integer("confLoss");
                table.integer("divWin");
                table.integer("divLoss");
                table.integer("homeWin");
                table.integer("homeLoss");
                table.integer("awayWin");
                table.integer("awayLoss");
                table.integer("lastTenWin");
                table.integer("lastTenLoss");
                table.integer("streak");
                table.string("divRank");
                table.boolean("isWinStreak");
                table.string("tieBreakerPts");
            })
            .then((result) => {
                console.log(result);
                console.log(`nba_standings table created.`);
                resolve(result);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
        });
    };


    populateNBAStandings(){
        return new Promise((resolve, reject) => {
            axios.get("http://localhost:8181/nbastandings")
            .then((standings) => {
                standings = standings.data;
                
                this.db(tableName)
                .insert(standings)
                .then((result) => {
                    console.log(result)
                    resolve(result);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
            });
        });
    };
}