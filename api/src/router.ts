import path from "path";
import _ from "lodash";
import rp from "request-promise";

//import { createNBATeamsTable, populateNBATeamsTable} from "./NBATeams";

import { NBAteams } from "./db_helpers/NBATeams";
import { Standings } from "./db_helpers/NBAStandings";

//import Report from "./models/report";
const currentDate = new Date();
const time = require("../lib/functions/time");
console.log(time.yyyymmdd());

const nbaDataUri = "data.nba.net";

var allNBATeams = [];
var activatedGames = [];

var nbaToday = {
    uri: `http://data.nba.net/10s/prod/v1/today.json`,
    headers: {
        'User-Agent': "Request-Promise"
    },
    json: true
}

const nbaCalendar = {
    uri: `https://data.nba.net/prod/v1/calendar.json`,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true
}

var scoreBoard = {
    uri: `https://data.nba.net/10s/prod/v1/${time.yyyymmdd()}/scoreboard.json`,
    //uri: `https://data.nba.net/10s/prod/v1/20181109/scoreboard.json`,
    headers: {
        'User-Agent': "Request-Promise"
    },
    json: true
}

var teams = {
    uri: `http://data.nba.net/prod/v2/2018/teams.json`,
    headers: {
        "User-Agent": "Request-Promise"
    },
    json: true
}

var players = {
    uri: `http://data.nba.net/prod/v1/2018/players.json`,
    headers: {
        "User-Agent": "Request-Promise"
    },
    json: true
}

var coaches = {
    uri: `http://data.nba.net/prod/v1/2018/coaches.json`,
    headers: {
        "User-Agent": "Request-Promise"
    },
    json: true
}

var schedule = {
    uri: `http://data.nba.net/prod/v1/2018/schedule.json`,
    headers: {
        "User-Agent": "Request-Promise"
    },
    json: true
}

var conferenceStandings = {
    uri: `http://data.nba.net/prod/v2/current/standings_conference.json`,
    headers: {
        "User-Agent": "Request-Promise"
    },
    json: true
}

var divisionStandings = {
    uri: `http://data.nba.net/prod/v2/current/standings_division.json`,
    headers: {
        "User-Agent": "Request-Promise"
    },
    json: true
}

var nbastandingsuri = {
    uri: `http://data.nba.net/prod/v1/current/standings_all_no_sort_keys.json`,
    headers: {
        "User-Agent": "Request-Promise"
    },
    json: true
}
var teamstatleaders = {
    uri: `http://data.nba.net/prod/v1/2018/team_stats_rankings.json`,
    headers: {
        "User-Agent": "Request-Promise"
    },
    json: true
}

//
//NOT YET ACTIVE
var lastfiveteamstats = {
    uri: `http://data.nba.net/prod/v1/2018/team_stats_last_five_games.json`,
    headers: {
        "User-Agent": "Request-Promise"
    },
    json: true
}

class AppRouter{
    constructor(app){
        this.app = app;
        this.setupRouters();
    }
    
    setupRouters(){
        const app = this.app;
        const db = app.get("db");
        
        var nbaTeams = new NBAteams(db);
        var nbaStandings = new Standings(db);

        app.get("/getTeamStandings/:teamId", (req, res) => {

            const teamId = req.params.teamId;
            console.log("teamId");

            const selectRows = [
                "fullName",
                "tricode",
                "nickname",
                "urlName",
                "confName",
                "divName",
                "city",
                "win",
                "loss",
                "winPct",
                "lossPct",
                "gamesBehind",
                "confRank",
                "confWin",
                "confLoss",
                "homeWin",
                "homeLoss",
                "lastTenWin",
                "lastTenLoss",
                "streak",
                "divRank",
                "isWinStreak"
            ];

            db.select(selectRows)
                .from("nba_standings")
                .innerJoin('nba_teams', "nba_teams.teamId", "nba_standings.teamId")
                .then((result) => {
                    res.send(result);
                    res.end();
                })
                .catch((err) => {
                    res.send(err);
                    res.end();
                });
        });

        app.get("/getTeamStandings", (req, res) => {
            const selectRows = [
                "fullName",
                "tricode",
                "nickname",
                "urlName",
                "confName",
                "divName",
                "city",
                "win",
                "loss",
                "winPct",
                "lossPct",
                "gamesBehind",
                "confRank",
                "confWin",
                "confLoss",
                "homeWin",
                "homeLoss",
                "lastTenWin",
                "lastTenLoss",
                "streak",
                "divRank",
                "isWinStreak"
            ];

            db.select(selectRows)
                .from("nba_standings")
                .innerJoin('nba_teams', "nba_teams.teamId", "nba_standings.teamId")
                .then((result) => {
                res.send(result);
                res.end();
            })
            .catch((err) => {
                res.send(err);
                res.end();
            });
        });

        app.get("/populateNBAStandings", (req, res) => {
            nbaStandings.populateNBAStandings()
            .then((result) => {
                res.send(result);
                res.end();
            })
            .catch((err) => {
                res.send(err);
                res.end();
            });
        });

        app.post("/createNBAStandingsTable", (req, res) => {
            nbaStandings.createNBAStandingsTable()
            .then((result) => {
                res.send(result);
                res.end();
            })
            .catch((err) => {
                res.send(err);
                res.end();
            })
        });

        app.post("/getNBATeam", (req, res) => {
            nbaTeams.getNBATeamByName("knicks")
            .then((team) => {
                res.send(team);
                res.end();
            })
            .catch((err) => {
                res.send(err);
                res.end();
            })
        });
        
        app.post("/getNBATeamId" , (req, res) => {
            nbaTeams.getIDByTeamName("1610612752")
            .then((team) => {
                res.send(team);
                res.end();
            })
            .catch((err) => {
                res.send(err);
                res.end();
            })
        });


        //Returns today's scoreboard
        app.get("/scoreboard", (req, res) => {
            rp(scoreBoard)
            .then((result) => {
                var scorecard = result.games;

                res.send(scorecard);
                res.end();
            })
            .catch((err) => {
                res.send(`There was an error with scoreboard..\n ${err}`);
                res.end();
            })
        });

        //Returns all NBA Teams
        app.get("/teams", (req, res) => {
            rp(teams)
            .then((nbaTeams) => {
                nbaTeams = nbaTeams.league.standard;
                
                var sortedNBATeams = []

                _.each(nbaTeams, (team) => {
                    if(team.isNBAFranchise){
                        sortedNBATeams.push(team);
                    } 
                });

                res.send(sortedNBATeams);
                res.end();
            })
            .catch((err) => {
                res.send(`There was an error with the teams route..\n ${err}`);
                res.end();
            })
        });


        app.get("/players", (req, res) => {
            rp(players)
            .then((nbaPlayers) => {
                nbaPlayers = nbaPlayers.league.standard;
                res.send(nbaPlayers);
                res.end();
            })
            .catch((err) => {
                res.send((`There was an error with the nba players route... \n ${err}`));
                res.end();
            })
        });

        app.get("/coaches", (req, res) => {
            rp(coaches)
            .then((nbaCoaches) => {
                nbaCoaches = nbaCoaches.league.standard;

                var coaches = [];

                _.each(nbaCoaches, (coach) => {
                    if(coach.isAssistant){
                        coaches.push(coach);
                    }
                });

                res.send(coaches);
                res.end();
            })
            .catch((err) => {
                res.send(`There was an error with the nba coaches route... \n ${err}`);
                res.end();
            })
        });

        app.get("/schedule", (req, res ) => {
            rp(schedule)
            .then((nbaSchedule) => {
                nbaSchedule = nbaSchedule.league.standard;

                res.send(nbaSchedule);
                res.end();
            })
            .catch((err) => {
                res.send(`There was an error with the nba schedule route.. \n ${err}`);
                res.end();
            });
        });

        app.get("/standings", (req, res) => {
            rp(conferenceStandings)
            .then((standings) => {
                var standingsEast = standings.league.standard.conference.east;
                var standingsWest = standings.league.standard.conference.west;

                var standings = {
                    eastStandings: [],
                    westStandings: []
                }

                _.each(standingsEast, (team) => {
                    //Delete key as not needed and causes issues
                    delete team.sortKey;

                    standings.eastStandings.push(team);
                });

                _.each(standingsWest, (team) => {
                    //Delete key as not needed and causes issues
                    delete team.sortKey;

                    standings.westStandings.push(team);
                });

                res.send(standings);
                res.end();
            })
            .catch((err) => {
                res.send(`There was an error with the nba conference standngs route ... \n ${err}`);
                res.end();
            });
        });
        
        app.get("/divstandings", (req, res) => {
            rp(divisionStandings)
            .then((standings) => {
                standings = standings.league.standard.conference;

                res.send(standings);
                res.end();
            })
            .catch((err) => {
                res.send(`There was an error with the nba division standing routes... \n ${err}`);
                res.end();
            })
        });

        app.get("/nbastandings", (req, res) => {

            rp(nbastandingsuri)
            .then((standings) => {
                standings = standings.league.standard.teams;

                res.send(standings);
                res.end();
            })
            .catch((err) => {
                res.send(err);
                res.end();
            });
        })

        app.get("/teamstatleaders", (req, res) => {
            rp(teamstatleaders)
            .then((teamstatleaders) => {
                teamstatleaders = teamstatleaders.league.standard;
                res.send(teamstatleaders);
                res.end()
            })
            .catch((err) => {
                res.send(`There was an error with the nba team stat leader routes... \n ${err}`);
                res.end();
            })
        });

        //Not Yet Active
        app.get("/lastfive", (req, res) => {
            rp(lastfiveteamstats)
            .then((lastfive) => {
                res.send(lastfive);
                res.end()
            })
            .catch((err) => {
                res.send(`There was an error with the nba last five game team stats routes... \n ${err}`);
                res.end();
            })
        });


    }
}

export default AppRouter;