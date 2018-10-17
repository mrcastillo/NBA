"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _requestPromise = require("request-promise");

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//import Report from "./models/report";
var currentDate = new Date();
var time = require("../lib/functions/time");
console.log(time.yyyymmdd() - 1);

var scoreBoard = {
    uri: "https://data.nba.net/10s/prod/v1/" + time.yyyymmdd() + "/scoreboard.json",
    headers: {
        'User-Agent': "Request-Promise"
    },
    json: true
};

var teams = {
    uri: "http://data.nba.net/prod/v2/2018/teams.json",
    headers: {
        "User-Agent": "Request-Promise"
    },
    json: true
};

var players = {
    uri: "http://data.nba.net/prod/v1/2018/players.json",
    headers: {
        "User-Agent": "Request-Promise"
    },
    json: true
};

var coaches = {
    uri: "http://data.nba.net/prod/v1/2018/coaches.json",
    headers: {
        "User-Agent": "Request-Promise"
    },
    json: true
};

var schedule = {
    uri: "http://data.nba.net/prod/v1/2018/schedule.json",
    headers: {
        "User-Agent": "Request-Promise"
    },
    json: true
};

var conferenceStandings = {
    uri: "http://data.nba.net/prod/v2/current/standings_conference.json",
    headers: {
        "User-Agent": "Request-Promise"
    },
    json: true
};

var divisionStandings = {
    uri: "http://data.nba.net/prod/v2/current/standings_division.json",
    headers: {
        "User-Agent": "Request-Promise"
    },
    json: true
};

var teamstatleaders = {
    uri: "http://data.nba.net/prod/v1/2018/team_stats_rankings.json",
    headers: {
        "User-Agent": "Request-Promise"
    },
    json: true

    //
    //NOT YET ACTIVE
};var lastfiveteamstats = {
    uri: "http://data.nba.net/prod/v1/2018/team_stats_last_five_games.json",
    headers: {
        "User-Agent": "Request-Promise"
    },
    json: true
};

var AppRouter = function () {
    function AppRouter(app) {
        _classCallCheck(this, AppRouter);

        this.app = app;
        this.setupRouters();
    }

    _createClass(AppRouter, [{
        key: "setupRouters",
        value: function setupRouters() {
            var app = this.app;
            //const db = app.get("db");

            //Returns today's scoreboard
            app.get("/scoreboard", function (req, res) {
                (0, _requestPromise2.default)(scoreBoard).then(function (result) {
                    var scorecard = result.games;

                    res.send(scorecard);
                    res.end();
                }).catch(function (err) {
                    res.send("There was an error with scoreboard..\n " + err);
                    res.end();
                });
            });

            //Returns all NBA Teams
            app.get("/teams", function (req, res) {
                (0, _requestPromise2.default)(teams).then(function (nbaTeams) {
                    nbaTeams = nbaTeams.league.standard;

                    var sortedNBATeams = [];

                    _lodash2.default.each(nbaTeams, function (team) {
                        if (team.isNBAFranchise) {
                            sortedNBATeams.push(team);
                        }
                    });

                    res.send(sortedNBATeams);
                    res.end();
                }).catch(function (err) {
                    res.send("There was an error with the teams route..\n " + err);
                    res.end();
                });
            });

            app.get("/players", function (req, res) {
                (0, _requestPromise2.default)(players).then(function (nbaPlayers) {
                    nbaPlayers = nbaPlayers.league.standard;
                    res.send(nbaPlayers);
                    res.end();
                }).catch(function (err) {
                    res.send("There was an error with the nba players route... \n " + err);
                    res.end();
                });
            });

            app.get("/coaches", function (req, res) {
                (0, _requestPromise2.default)(coaches).then(function (nbaCoaches) {
                    nbaCoaches = nbaCoaches.league.standard;

                    var coaches = [];

                    _lodash2.default.each(nbaCoaches, function (coach) {
                        if (coach.isAssistant) {
                            coaches.push(coach);
                        }
                    });

                    res.send(coaches);
                    res.end();
                }).catch(function (err) {
                    res.send("There was an error with the nba coaches route... \n " + err);
                    res.end();
                });
            });

            app.get("/schedule", function (req, res) {
                (0, _requestPromise2.default)(schedule).then(function (nbaSchedule) {
                    nbaSchedule = nbaSchedule.league.standard;

                    res.send(nbaSchedule);
                    res.end();
                }).catch(function (err) {
                    res.send("There was an error with the nba schedule route.. \n " + err);
                    res.end();
                });
            });

            app.get("/standings", function (req, res) {
                (0, _requestPromise2.default)(conferenceStandings).then(function (standings) {
                    var standingsEast = standings.league.standard.conference.east;
                    var standingsWest = standings.league.standard.conference.west;

                    var standings = {
                        eastStandings: [],
                        westStandings: []
                    };

                    _lodash2.default.each(standingsEast, function (team) {
                        standings.eastStandings.push(team);
                    });

                    _lodash2.default.each(standingsWest, function (team) {
                        standings.westStandings.push(team);
                    });

                    res.send(standings);
                    res.end();
                }).catch(function (err) {
                    res.send("There was an error with the nba conference standngs route ... \n " + err);
                    res.end();
                });
            });

            app.get("/divstandings", function (req, res) {
                (0, _requestPromise2.default)(divisionStandings).then(function (standings) {
                    standings = standings.league.standard.conference;

                    res.send(standings);
                    res.end();
                }).catch(function (err) {
                    res.send("There was an error with the nba division standing routes... \n " + err);
                    res.end();
                });
            });

            app.get("/teamstatleaders", function (req, res) {
                (0, _requestPromise2.default)(teamstatleaders).then(function (teamstatleaders) {
                    teamstatleaders = teamstatleaders.league.standard;
                    res.send(teamstatleaders);
                    res.end();
                }).catch(function (err) {
                    res.send("There was an error with the nba team stat leader routes... \n " + err);
                    res.end();
                });
            });

            //Not Yet Active
            app.get("/lastfive", function (req, res) {
                (0, _requestPromise2.default)(lastfiveteamstats).then(function (lastfive) {
                    res.send(lastfive);
                    res.end();
                }).catch(function (err) {
                    res.send("There was an error with the nba last five game team stats routes... \n " + err);
                    res.end();
                });
            });
        }
    }]);

    return AppRouter;
}();

exports.default = AppRouter;