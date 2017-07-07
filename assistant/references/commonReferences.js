'use strict';
const Logger = require('logger-romens');
const knex = require('../../modules/db');
//const businessModel = require("icrm-business-model");
const modelList = require("../case/modelEntity/modelList.js");
const businessModel = require("../../jsTemplateGenerator/new/businessModel/index.js")(knex, modelList);
require("../case/dispModelEntity/test.js")(businessModel.dataStructure);
const _ = require("lodash");

module.exports = {
  logger: new Logger(),
  knex: knex,
  businessModel: businessModel,
  _: _
};