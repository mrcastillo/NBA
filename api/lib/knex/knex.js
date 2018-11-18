"use strict";

var environment = process.env.ENVIRONMENT || 'development';

var config = require('./knexfile.js')[environment];

module.exports = require('knex')(config);