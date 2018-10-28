"use strict";

var request = require("request");

module.exports = {
  getRequest: function getRequest(uri) {
    return new Promise(function (resolve, reject) {
      request({
        method: "GET",
        json: true,
        uri: uri
      }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(body);
        } else {
          reject(error);
        }
      });
    });
  }
};