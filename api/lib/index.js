"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _http = _interopRequireDefault(require("http"));

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _cors = _interopRequireDefault(require("cors"));

var _router = _interopRequireDefault(require("./router"));

//import { connect } from "./database";
var knex = require('./knex/knex.js'); //file storage config


var storageDir = _path.default.join(__dirname, "..", "storage");

var storage = _multer.default.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, storageDir);
  },
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  }
});

var upload = (0, _multer.default)({
  storage: storage
});
var PORT = 8181;
var app = (0, _express.default)();
app.server = _http.default.createServer(app);
app.use((0, _morgan.default)("dev"));
app.use((0, _cors.default)({
  exposedHeaders: "*"
}));
app.use(_bodyParser.default.json({
  limit: "50mb"
}));
app.set("root", __dirname);
app.set("storageDir", storageDir);
app.db = knex;
app.set("db", knex);
new _router.default(app);
app.server.listen(process.env.PORT || PORT, function () {
  console.log("App is running on port " + app.server.address().port);
});
/*
connect((connection) => {
    //Sets the database in our application, we initialize our router with (app) so that we can acccess this.
    app.db = connection;
    app.set("db", connection);

    connection.query("SELECT * from nba_teams", (err, teams) => {
        if(err){
            console.error(`Error setting nba_teams obj. Maybe run createNBATeamsTable script or create nba_teams table.\n` + err);
        };
        //This object will alwyas return our NBAteams.
        app.nbaTeams = teams;
        app.set("nbaTeams", teams);

        //init router
        new AppRouter(app);
        
        app.server.listen(process.env.PORT || PORT, function () {
            console.log("App is running on port " + app.server.address().port);
        });
    });
})
*/

var _default = app;
exports.default = _default;