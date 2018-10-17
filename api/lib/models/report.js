"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Report = function () {
    function Report(app) {
        _classCallCheck(this, Report);

        this.app = app;

        this.model = {
            rotation: null,
            status: null,
            timeframe: null,
            description: null,
            resource: null,
            rfc: null,
            ipsoft_ticket: null
        };
    }

    _createClass(Report, [{
        key: "initWithObject",
        value: function initWithObject(object) {
            this.model.rotation = _lodash2.default.get(object, "rotation");
            this.model.status = _lodash2.default.get(object, "status");
            this.model.timeframe = _lodash2.default.get(object, "timeframe");
            this.model.description = _lodash2.default.get(object, "description");
            this.model.resource = _lodash2.default.get(object, "resource");
            this.model.rfc = _lodash2.default.get(object, "rfc");
            this.model.ipsoft_ticket = _lodash2.default.get(object, "ipsoft_ticket");
            return this;
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
            return this.model;
        }
    }]);

    return Report;
}();

exports.default = Report;