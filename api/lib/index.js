"use strict";

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _multer = require("multer");

var _multer2 = _interopRequireDefault(_multer);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _router = require("./router");

var _router2 = _interopRequireDefault(_router);

var _database = require("./database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//file storage config
var storageDir = _path2.default.join(__dirname, "..", "storage");

var storage = _multer2.default.diskStorage({
    destination: function destination(req, file, cb) {
        cb(null, storageDir);
    },
    filename: function filename(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now());
    }
});

var upload = (0, _multer2.default)({ storage: storage });

var PORT = 8181;
var app = (0, _express2.default)();
app.server = _http2.default.createServer(app);

app.use((0, _morgan2.default)("dev"));

app.use((0, _cors2.default)({
    exposedHeaders: "*"
}));

app.use(_bodyParser2.default.json({
    limit: "50mb"
}));

app.set("root", __dirname);
app.set("storageDir", storageDir);

/*
new AppRouter(app);

app.server.listen(process.env.PORT || PORT, function() {
    console.log("App is running on port " + app.server.address().port);
    console.log(`Database has started`);
});
*/

(0, _database.connect)(function (connection) {
    //Sets the database in our application, we initialize our router with (app) so that we can acccess this.
    //app.db = connection;
    app.set("db", connection);

    //init router
    new _router2.default(app);

    app.server.listen(process.env.PORT || PORT, function () {
        console.log("App is running on port " + app.server.address().port);
        console.log("Database has started");
    });
});