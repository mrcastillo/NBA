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
          table.boolean("teamId").primary();
          table.integer("win");
          table.integer("loss");
          table.float("winPct");
          table.float("winPctV2");
          table.float("lossPct");
          table.float("lossPctV2");
          table.integer("homeWin");
          table.integer("homeLoss");
          table.integer("awayWin");
          table.integer("awayLoss");
          table.integer("streak");
          table.boolean("isWinStreak");
        }).then(function (result) {
          console.log(result);
          console.log("nba_standings table created.");
          resolve(result);
        }).catch(function (err) {
          reject(err);
        });
      });
    }
  }]);
  return Standings;
}();

exports.Standings = Standings;