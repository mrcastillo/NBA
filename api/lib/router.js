"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _lodash = _interopRequireDefault(require("lodash"));

var _requestPromise = _interopRequireDefault(require("request-promise"));

var _NBATeams = require("./NBATeams");

//import { createNBATeamsTable, populateNBATeamsTable} from "./NBATeams";
var nbaTeams = new _NBATeams.NBAteams(); //import Report from "./models/report";

var currentDate = new Date();

var time = require("../lib/functions/time");

console.log(time.yyyymmdd());
var allNBATeams = [];
var activatedGames = [];
var scoreBoard = {
  uri: "https://data.nba.net/10s/prod/v1/".concat(time.yyyymmdd(), "/scoreboard.json"),
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
  json: true //
  //NOT YET ACTIVE

};
var lastfiveteamstats = {
  uri: "http://data.nba.net/prod/v1/2018/team_stats_last_five_games.json",
  headers: {
    "User-Agent": "Request-Promise"
  },
  json: true
};

var AppRouter =
/*#__PURE__*/
function () {
  function AppRouter(app) {
    (0, _classCallCheck2.default)(this, AppRouter);
    this.app = app;
    this.setupRouters();
  }

  (0, _createClass2.default)(AppRouter, [{
    key: "setupRouters",
    value: function setupRouters() {
      var app = this.app;
      var db = app.get("db");
      app.get("/test", function (req, res) {
        nbaTeams.populateNBATeamsTable(db, function (err, result) {
          if (err) console.error(err);
          console.log(result);
        });
        res.end();
      });
      app.post("/createNBATeamsTable", function (req, res) {
        createNBATeamsTable(db).then(function (result) {
          res.send(result);
          res.end();
        }).catch(function (err) {
          res.send(err);
          res.end();
        });
      });
      app.post("/populateNBATeamsTable", function (req, res) {
        populateNBATeamsTable(db).then(function (result) {
          res.send(result);
          res.end();
        }).catch(function (err) {
          res.send(err);
          res.end();
        });
      }); //Returns today's scoreboard

      app.get("/scoreboard", function (req, res) {
        (0, _requestPromise.default)(scoreBoard).then(function (result) {
          var scorecard = result.games;
          res.send(scorecard);
          res.end();
        }).catch(function (err) {
          res.send("There was an error with scoreboard..\n ".concat(err));
          res.end();
        });
      }); //Returns all NBA Teams

      app.get("/teams", function (req, res) {
        (0, _requestPromise.default)(teams).then(function (nbaTeams) {
          nbaTeams = nbaTeams.league.standard;
          var sortedNBATeams = [];

          _lodash.default.each(nbaTeams, function (team) {
            if (team.isNBAFranchise) {
              sortedNBATeams.push(team);
            }
          });

          res.send(sortedNBATeams);
          res.end();
        }).catch(function (err) {
          res.send("There was an error with the teams route..\n ".concat(err));
          res.end();
        });
      });
      app.get("/players", function (req, res) {
        (0, _requestPromise.default)(players).then(function (nbaPlayers) {
          nbaPlayers = nbaPlayers.league.standard;
          res.send(nbaPlayers);
          res.end();
        }).catch(function (err) {
          res.send("There was an error with the nba players route... \n ".concat(err));
          res.end();
        });
      });
      app.get("/coaches", function (req, res) {
        (0, _requestPromise.default)(coaches).then(function (nbaCoaches) {
          nbaCoaches = nbaCoaches.league.standard;
          var coaches = [];

          _lodash.default.each(nbaCoaches, function (coach) {
            if (coach.isAssistant) {
              coaches.push(coach);
            }
          });

          res.send(coaches);
          res.end();
        }).catch(function (err) {
          res.send("There was an error with the nba coaches route... \n ".concat(err));
          res.end();
        });
      });
      app.get("/schedule", function (req, res) {
        (0, _requestPromise.default)(schedule).then(function (nbaSchedule) {
          nbaSchedule = nbaSchedule.league.standard;
          res.send(nbaSchedule);
          res.end();
        }).catch(function (err) {
          res.send("There was an error with the nba schedule route.. \n ".concat(err));
          res.end();
        });
      });
      app.get("/standings", function (req, res) {
        (0, _requestPromise.default)(conferenceStandings).then(function (standings) {
          var standingsEast = standings.league.standard.conference.east;
          var standingsWest = standings.league.standard.conference.west;
          var standings = {
            eastStandings: [],
            westStandings: []
          };

          _lodash.default.each(standingsEast, function (team) {
            standings.eastStandings.push(team);
          });

          _lodash.default.each(standingsWest, function (team) {
            standings.westStandings.push(team);
          });

          res.send(standings);
          res.end();
        }).catch(function (err) {
          res.send("There was an error with the nba conference standngs route ... \n ".concat(err));
          res.end();
        });
      });
      app.get("/divstandings", function (req, res) {
        (0, _requestPromise.default)(divisionStandings).then(function (standings) {
          standings = standings.league.standard.conference;
          res.send(standings);
          res.end();
        }).catch(function (err) {
          res.send("There was an error with the nba division standing routes... \n ".concat(err));
          res.end();
        });
      });
      app.get("/teamstatleaders", function (req, res) {
        (0, _requestPromise.default)(teamstatleaders).then(function (teamstatleaders) {
          teamstatleaders = teamstatleaders.league.standard;
          res.send(teamstatleaders);
          res.end();
        }).catch(function (err) {
          res.send("There was an error with the nba team stat leader routes... \n ".concat(err));
          res.end();
        });
      }); //Not Yet Active

      app.get("/lastfive", function (req, res) {
        (0, _requestPromise.default)(lastfiveteamstats).then(function (lastfive) {
          res.send(lastfive);
          res.end();
        }).catch(function (err) {
          res.send("There was an error with the nba last five game team stats routes... \n ".concat(err));
          res.end();
        });
      });
    }
  }]);
  return AppRouter;
}();

var _default = AppRouter;
exports.default = _default;