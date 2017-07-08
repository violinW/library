'use strict';
const Logger = require('logger-romens');
const _ = require("lodash");
const knex = require('../../modules/db');

module.exports = (businessModel)=>{
  require("../case/dispModelEntity/test.js")(businessModel);
  return {
    logger: new Logger(),
    knex: knex,
    businessModel: businessModel,
    _: _
  };
}