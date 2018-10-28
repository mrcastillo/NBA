"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var connection = require("./database");

var web = require('./web');

var time = require('./time');

var fs = require('fs');

var nba = new Object();
nba.teams = web.getRequest("http://data.nba.net/prod/v1/2017/teams.json");
nba.nbatoday = web.getRequest("http://data.nba.net/10s/prod/v1/today.json");
module.exports = {
  start_live_scores: function start_live_scores(callback) {
    global.scoreScrapper = setInterval(
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      var live_scoreboard;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return web.getRequest("http://data.nba.net/prod/v1/20180201/scoreboard.json");

            case 2:
              live_scoreboard = _context.sent;
              nba.live_scores = live_scoreboard.games;
              callback(nba.live_scores);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    })), 5000);
  },
  stop_live_scores: function stop_live_scores() {
    clearInterval(global.scoreScrapper);
    console.log("stopped");
  },
  get_file_nba_schedule: function () {
    var _get_file_nba_schedule = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2() {
      var nba_schedule, parsed_nba_schedule, i, new_schedule_for_import, pathName;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return web.getRequest('http://data.nba.net/prod/v1/2017/schedule.json');

            case 2:
              nba_schedule = _context2.sent;
              nba_schedule = nba_schedule.league.standard;
              parsed_nba_schedule = [];

              for (i = 0; i < nba_schedule.length; i++) {
                //console.log(schedule[0]);
                new_schedule_for_import = {
                  gameId: nba_schedule[i].gameId,
                  gameUrlCode: nba_schedule[i].gameUrlCode,
                  seasonStageId: nba_schedule[i].seasonStageId,
                  statusNum: nba_schedule[i].statusNum,
                  startTimeUTC: nba_schedule[i].startTimeUTC,
                  startDateEastern: nba_schedule[i].startDateEastern,
                  startTimeEastern: nba_schedule[i].startTimeEastern,
                  isBuzzerBeater: nba_schedule[i].isBuzzerBeater,
                  nugget: nba_schedule[i].nugget.text,
                  hTeam_teamId: nba_schedule[i].hTeam.teamId,
                  hTeam_score: nba_schedule[i].hTeam.score,
                  hTeam_wins: nba_schedule[i].hTeam.win,
                  hTeam_loss: nba_schedule[i].hTeam.loss,
                  vTeam_teamId: nba_schedule[i].vTeam.teamId,
                  vTeam_score: nba_schedule[i].vTeam.score,
                  vTeam_wins: nba_schedule[i].vTeam.win,
                  vTeam_loss: nba_schedule[i].vTeam.loss,
                  isLeaguePass: nba_schedule[i].watch.broadcast.video.isLeaguePass //isTNTOT:        nba_schedule[i].watch.broadcast.video.isTNTOT,
                  //isBlackout:     nba_schedule[i].watch.broadcast.video.isNationalBlackout,
                  //canPurcahse:    nba_schedule[i].watch.broadcast.video.canPurchase,
                  //watch_national:   nba_schedule[i].watch.broadcast.video.national.broadcasters.shortName,
                  //watch_canada:     nba_schedule[i].watch.broadcast.video.canadian[0].shortName,
                  //watch_spanish:    nba_schedule[i].watch.broadcast.video.spanish_national[0].shortName

                };
                parsed_nba_schedule.push(new_schedule_for_import);
              } //Convert to readable string, instead of [object Object];


              parsed_nba_schedule = JSON.stringify(parsed_nba_schedule); //Pathname for our file storage.

              pathName = "".concat(__dirname, "/../storage/nba_data/nba_schedule.json"); //Create JSON file containing out JSON data into a file.

              _context2.next = 10;
              return fs.writeFile(pathName, parsed_nba_schedule, function (err) {
                if (err) {
                  console.error('There was a error when writing NBA Schedule to a file.\n' + err);
                  return;
                }

                console.log("NBA Schedule was successfully written to ".concat(pathName));
              });

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function get_file_nba_schedule() {
      return _get_file_nba_schedule.apply(this, arguments);
    };
  }(),
  get_file_nba_conference_standings: function () {
    var _get_file_nba_conference_standings = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee3() {
      var c_standings, west_standings, east_standings, i, west_team, east_teams, westFilePath, eastFilePath;
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return web.getRequest('http://data.nba.net/prod/v1/current/standings_conference.json');

            case 2:
              c_standings = _context3.sent;
              w_standings = c_standings.league.standard.conference.west;
              e_standings = c_standings.league.standard.conference.east;
              west_standings = new Array();
              east_standings = new Array();

              for (i = 0; i < w_standings.length; i++) {
                west_team = {
                  teamId: w_standings[i].teamId,
                  win: w_standings[i].win,
                  loss: w_standings[i].loss,
                  winPct: w_standings[i].winPct,
                  winPctV2: w_standings[i].winPctV2,
                  lossPct: w_standings[i].lossPct,
                  lossPctV2: w_standings[i].lossPctV2,
                  gamesBehind: w_standings[i].gamesBehind,
                  divGamesBehind: w_standings[i].divGamesBehind,
                  clinchedPlayoffsCode: w_standings[i].clinchedPlayoffsCode,
                  clinchedPlayoffsCodeV2: w_standings[i].clinchedPlayoffsCodeV2,
                  confRank: w_standings[i].confRank,
                  confWin: w_standings[i].confWin,
                  confLoss: w_standings[i].confLoss,
                  divWin: w_standings[i].divWin,
                  divLoss: w_standings[i].divLoss,
                  homeWin: w_standings[i].homeWin,
                  homeLoss: w_standings[i].homeLoss,
                  awayWin: w_standings[i].awayWin,
                  awayLoss: w_standings[i].awayLoss,
                  lastTenWin: w_standings[i].lastTenWin,
                  lastTenLoss: w_standings[i].lastTenLoss,
                  streak: w_standings[i].streak,
                  divRank: w_standings[i].divRank,
                  isWinStreak: w_standings[i].isWinStreak,
                  sortDefaultOrder: w_standings[i].sortDefaultOrder
                };
                west_standings.push(west_team);
              }

              for (i = 0; i < e_standings.length; i++) {
                east_teams = {
                  teamId: e_standings[i].teamId,
                  win: e_standings[i].win,
                  loss: e_standings[i].loss,
                  winPct: e_standings[i].winPct,
                  winPctV2: e_standings[i].winPctV2,
                  lossPct: e_standings[i].lossPct,
                  lossPctV2: e_standings[i].lossPctV2,
                  gamesBehind: e_standings[i].gamesBehind,
                  divGamesBehind: e_standings[i].divGamesBehind,
                  clinchedPlayoffsCode: e_standings[i].clinchedPlayoffsCode,
                  clinchedPlayoffsCodeV2: e_standings[i].clinchedPlayoffsCodeV2,
                  confRank: e_standings[i].confRank,
                  confWin: e_standings[i].confWin,
                  confLoss: e_standings[i].confLoss,
                  divWin: e_standings[i].divWin,
                  divLoss: e_standings[i].divLoss,
                  homeWin: e_standings[i].homeWin,
                  homeLoss: e_standings[i].homeLoss,
                  awayWin: e_standings[i].awayWin,
                  awayLoss: e_standings[i].awayLoss,
                  lastTenWin: e_standings[i].lastTenWin,
                  lastTenLoss: e_standings[i].lastTenLoss,
                  streak: e_standings[i].streak,
                  divRank: e_standings[i].divRank,
                  isWinStreak: e_standings[i].isWinStreak,
                  sortDefaultOrder: e_standings[i].sortDefaultOrder
                };
                east_standings.push(east_teams);
              }

              west_standings = JSON.stringify(west_standings);
              east_standings = JSON.stringify(east_standings);
              westFilePath = "".concat(__dirname, "/../storage/nba_data/nba_conference_west.json");
              eastFilePath = "".concat(__dirname, "/../storage/nba_data/nba_conference_east.json");
              fs.writeFile(westFilePath, west_standings, function (err) {
                if (err) {
                  console.error("There was a problem writing West Conference Standings to a file.\n" + err);
                  return;
                }

                console.log('Successfully wrote West Conference Standings.');
              });
              fs.writeFile(eastFilePath, east_standings, function (err) {
                if (err) {
                  console.error("There was a problem writing East Conference Standings to a file\n" + err);
                  return;
                }

                console.log("Successfully wrote East Conference Standings.");
              });

            case 15:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function get_file_nba_conference_standings() {
      return _get_file_nba_conference_standings.apply(this, arguments);
    };
  }(),
  get_file_nba_coaches: function () {
    var _get_file_nba_coaches = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee4() {
      var nba_coaches, pathName;
      return _regenerator.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return web.getRequest('http://data.nba.net/prod/v1/2017/coaches.json');

            case 2:
              nba_coaches = _context4.sent;
              nba_coaches = JSON.stringify(nba_coaches.league.standard);
              console.log(nba_coaches);
              pathName = "".concat(__dirname, "/../storage/nba_data/nba_coaches.json");
              _context4.next = 8;
              return fs.writeFile(pathName, nba_coaches, function (err) {
                if (err) {
                  console.error("There was an error writing NBA Coaches to a file.\n" + err);
                  return;
                }

                console.log("NBA Schedule was successfully written to ".concat(pathName));
              });

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function get_file_nba_coaches() {
      return _get_file_nba_coaches.apply(this, arguments);
    };
  }(),
  updateCreateNBASchedule: function () {
    var _updateCreateNBASchedule = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee6() {
      var tableQuery, insertNBAQuery;
      return _regenerator.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              //Query to create a table if it does not exist.
              tableQuery = "CREATE TABLE IF NOT EXISTS nba_schedule (";
              tableQuery += "gameId INT NOT NULL,";
              tableQuery += "gameUrlCode INT NOT NULL,";
              tableQuery += "seasonStageId TEXT NOT NULL,";
              tableQuery += "statusNum TEXT NOT NULL,";
              tableQuery += "startTimeUTC TEXT NOT NULL,";
              tableQuery += "startDateEastern TEXT NOT NULL,";
              tableQuery += "startTimeEastern TEXT NOT NULL,";
              tableQuery += "isBuzzerBeater TEXT NOT NULL,";
              tableQuery += "nugget TEXT NOT NULL,";
              tableQuery += "hTeam_teamId INT NOT NULL,";
              tableQuery += "hTeam_score INT NOT NULL,";
              tableQuery += "hTeam_win INT NOT NULL,";
              tableQuery += "hTeam_loss INT NOT NULL,";
              tableQuery += "vTeam_teamId INT NOT NULL,";
              tableQuery += "vTeam_score INT NOT NULL,";
              tableQuery += "vTeam_win INT NOT NULL,";
              tableQuery += "vTeam_loss INT NOT NULL,";
              tableQuery += "isLeaguePass TEXT NOT NULL,";
              tableQuery += "PRIMARY KEY(gameId) );"; //Executes our tableQuery.

              _context6.next = 22;
              return connection.query(tableQuery, function (err, result, fields) {
                if (err) {
                  throw ">>Trouble Creating nba_schedule Table.\n>>" + err;
                }

                console.log(result);
              });

            case 22:
              //This query will insert or update our data into MYSQL
              insertNBAQuery = "REPLACE INTO nba_schedule";
              insertNBAQuery += "(gameId, gameUrlCode, seasonStageId, statusNum, startTimeUTC, startDateEastern, startTimeEastern, isBuzzerBeater, nugget, hTeam_teamId, hTeam_score, hTeam_win, hTeam_loss, vTeam_teamId, vTeam_score, vTeam_win, vTeam_loss, isLeaguePass)";
              insertNBAQuery += "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"; //Prepare our query for insertion with execute.

              _context6.next = 27;
              return connection.prepare(insertNBAQuery,
              /*#__PURE__*/
              function () {
                var _ref2 = (0, _asyncToGenerator2.default)(
                /*#__PURE__*/
                _regenerator.default.mark(function _callee5(err, statement) {
                  var scheduleJSON, nbaSchedule, i;
                  return _regenerator.default.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          if (!err) {
                            _context5.next = 2;
                            break;
                          }

                          throw err;

                        case 2:
                          _context5.next = 4;
                          return web.getRequest('http://data.nba.net/prod/v1/2017/schedule.json');

                        case 4:
                          scheduleJSON = _context5.sent;
                          scheduleJSON = scheduleJSON.league.standard;
                          nbaSchedule = []; // Push every game in schedule in this array.
                          //Loop through scheduleJSON and push game data to our NBA Schedule as an array

                          for (i = 0; i < scheduleJSON.length; i++) {
                            nbaSchedule.push([scheduleJSON[i].gameId, scheduleJSON[i].seasonStageId, scheduleJSON[i].gameUrlCode, scheduleJSON[i].statusNum, scheduleJSON[i].startTimeUTC, scheduleJSON[i].startDateEastern, scheduleJSON[i].startTimeEastern, scheduleJSON[i].isBuzzerBeater, scheduleJSON[i].nugget.text, scheduleJSON[i].hTeam.teamId, scheduleJSON[i].hTeam.score ? scheduleJSON[i].hTeam.score : 0, scheduleJSON[i].hTeam.win ? scheduleJSON[i].hTeam.win : 0, scheduleJSON[i].hTeam.loss ? scheduleJSON[i].hTeam.loss : 0, scheduleJSON[i].vTeam.teamId, scheduleJSON[i].vTeam.score ? scheduleJSON[i].vTeam.score : 0, scheduleJSON[i].vTeam.win ? scheduleJSON[i].vTeam.win : 0, scheduleJSON[i].vTeam.loss ? scheduleJSON[i].vTeam.loss : 0, scheduleJSON[i].watch.broadcast.video.isLeaguePass]);
                            statement.execute(nbaSchedule[i], function (err, rows, fields) {
                              if (err) {
                                console.error("There was an error when attempting to insert NBA Schedule data into mysql table.\n" + err);
                                throw err;
                              }

                              console.log(rows);
                              console.log("Execute Function Completed. Row Inserted.");
                            });
                          }

                          statement.close();

                        case 9:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5, this);
                }));

                return function (_x, _x2) {
                  return _ref2.apply(this, arguments);
                };
              }());

            case 27:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function updateCreateNBASchedule() {
      return _updateCreateNBASchedule.apply(this, arguments);
    };
  }(),
  returnNBASchedule: function returnNBASchedule() {
    var insertedGameDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : time.yyyymmdd();
    return new Promise(function (resolve, reject) {
      //const today = time.yyyymmdd();
      //const monthLength = time.monthLength();
      var selectTable = "SELECT * FROM nba_schedule WHERE startDateEastern = ?";
      var gameDate = [insertedGameDate];
      connection.execute(selectTable, gameDate, function (err, rows, fields) {
        if (err) reject(err); //console.log(rows[0]);
        //console.log(fields[0]);

        resolve(rows);
      });
    });
  }
  /*
  get_nba_allstars : async function(){
  	var allstars = await web.getRequest('http://data.nba.net/prod/v1/allstar/2017/AS_roster.json');
  	allstars = allstars.roster.players;
  	allstar_teams = allstars.roster.teams;
  	allstar_game_date = allstars.sportsContent.sportsMeta.seasonMeta.calendarDate;
  		var nba_allstars = [];
  		for(var i = 0; i < allstars.length; i++){
  		var allstar_player = {
  			}
  	}
  }
  */

};