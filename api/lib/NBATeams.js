"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NBAteams = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _axios = _interopRequireDefault(require("axios"));

var _lodash = _interopRequireDefault(require("lodash"));

var tableName = "nba_teams";

var NBAteams =
/*#__PURE__*/
function () {
  function NBAteams(db) {
    (0, _classCallCheck2.default)(this, NBAteams);
    this.db = db;
  }

  (0, _createClass2.default)(NBAteams, [{
    key: "createNBATeamsTable",
    value: function createNBATeamsTable() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.db.schema.createTable(tableName, function (table) {
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
        }).then(function (result) {
          console.log(result);
          console.log("nba_teams table created");
          resolve(true);
        }).catch(function (err) {
          reject(err);
        });
      });
    }
  }, {
    key: "populateNBATeamsTable",
    value: function populateNBATeamsTable() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _axios.default.get("http://localhost:8181/teams").then(function (teams) {
          var nbaTeams = teams.data;
          console.log(nbaTeams);

          _this2.db("nba_teams").insert(nbaTeams).then(function (result) {
            console.log(result);
            resolve(result);
          }).catch(function (err) {
            reject(err);
          });
        }).catch(function (err) {
          reject(err);
        });
      });
    }
  }, {
    key: "createAndPopulateNBATeams",
    value: function createAndPopulateNBATeams() {}
  }]);
  return NBAteams;
}();

exports.NBAteams = NBAteams;