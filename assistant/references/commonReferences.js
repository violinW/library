'use strict';
const Logger = require('logger-romens');
const knex = require('../../modules/db');
const businessModel = require("icrm-business-model");
const modelList = require("../../case/modelList.js");
const _ = require("lodash");

module.exports = {
  logger: new Logger(),
  knex: knex,
  businessModel: businessModel(knex, modelList),
  _: _
};