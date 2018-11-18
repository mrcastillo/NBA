"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Standings = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _axios = _interopRequireDefault(require("axios"));

var _lodash = _interopRequireDefault(require("lodash"));

var tableName = "nba_standings";

var Standings =
/*#__PURE__*/
function () {
  function Standings(db) {
    (0, _classCallCheck2.default)(this, Standings);
    this.db = db;
  }

  (0, _createClass2.default)(Standings, [{
    key: "createNBAStandingsTable",
    value: function createNBAStandingsTable() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.db.schema.createTable(tableName, function (table) {
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
        }).then(function (result) {
          console.log(result);
          console.log("nba_standings table created.");
          resolve(result);
        }).catch(function (err) {
          console.log(err);
          reject(err);
        });
      });
    }
  }, {
    key: "populateNBAStandings",
    value: function populateNBAStandings() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _axios.default.get("http://localhost:8181/nbastandings").then(function (standings) {
          standings = standings.data;

          _this2.db(tableName).insert(standings).then(function (result) {
            console.log(result);
            resolve(result);
          }).catch(function (err) {
            console.log(err);
            reject(err);
          });
        });
      });
    }
  }]);
  return Standings;
}();

exports.Standings = Standings;