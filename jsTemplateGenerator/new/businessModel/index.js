'use strict';
const CommonDataSource = require("./basicModel.js");
const BasicUseCase = require("./basicUseCase.js");
module.exports = (knex, modelList)=> {
  const modelProcessor = require("./modelProcessor.js")(modelList || {});
  return {
    CommonUseCase: (dbName, modelName, modeName)=> {
      return BasicUseCase(knex)(dbName, modelProcessor(modelName).setMode(modeName));
    },
    CommonDataSource: CommonDataSource(knex)
  }
};