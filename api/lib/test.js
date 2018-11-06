"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNBATeamsTable = createNBATeamsTable;
exports.populateNBATeamsTable = populateNBATeamsTable;

var _axios = _interopRequireDefault(require("axios"));

var tableName = "nba_teams";

function createNBATeamsTable(db) {
  return new Promise(function (resolve, reject) {
    db.schema.createTable(tableName, function (table) {
      table.increments("id");
      table.boolean("isNBAFranchise");
      table.boolean("isAllStar");
      table.string("city");
      table.string("altCityName");
      table.string("fullName");
      table.string("tricode");
      table.integer("teamId");
      table.string("nickname");
      table.string("urlName");
      table.string("confName");
      table.string("divName");
    }).then(function (anything) {
      console.log(anything);
      console.log("nba_teams table created");
      resolve(true);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function populateNBATeamsTable(db) {
  return new Promise(function (resolve, reject) {
    _axios.default.get("http://localhost:8181/teams").then(function (teams) {
      console.log(teams);
    });
  });
}