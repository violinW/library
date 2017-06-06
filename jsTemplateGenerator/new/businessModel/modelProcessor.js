'use strict';
const modelList = require("./modelList");
const logger = require('modules/filterLogger');
const _ = require('lodash');
/**
 * 开起和关闭log
 * @type {boolean}
 */
const consoleSwitch = true;
const log = function (log) {
  consoleSwitch ? logger.info(log) : null;
};

function ModelProcessor(modelName) {
  this.structure = modelList[modelName];
  this.setMode = (modeName)=> {
    if (!modelList[modelName]) {
      log(`[error]业务模型 ${modelName} 不存在！`);
      return;
    }
    if (!modelList[modelName]["mode"] && modeName) {
      log(`[error]业务模型 ${modelName} 不存在模式 ${modeName}！`);
      return;
    }
    const modeParams = modeName ? modelList[modelName]["mode"][modeName] : "COMPLETE_MODE";
    const structure = modelList[modelName];
    const foreignModel = [], mappingModel = [];

    _.each(structure.ForeignKey, (foreignTable)=> {
      if (modeParams === "COMPLETE_MODE" || _.findIndex(modeParams["ForeignKey"], (item)=> {
          return item === foreignTable.name;
        }) > -1)
        foreignModel.push({
          "Table": foreignTable.Table,
          "ThisTableKey": foreignTable.ThisTableKey,
          "ForeignTableKey": foreignTable.ForeignTableKey
        })
    });

    _.each(structure.MappingKey, (mappingTable)=> {
      if (modeParams === "COMPLETE_MODE" || _.findIndex(modeParams["MappingKey"], (item)=> {
          return item === mappingTable.name;
        }) > -1)
        mappingModel.push({
          "ThisTableKey": mappingTable.ThisTableKey,
          "MiddleTable": mappingTable.MiddleTable,
          "MiddleKey": mappingTable.MiddleKey,
          "MappingKey": mappingTable.MappingKey,
          "MappingTable": mappingTable.MappingTable,
          "MappingTableKey": mappingTable.MappingTableKey
        })
    });
    return {
      "TableName": structure.TableName,
      "UniqueKey": structure.UniqueKey,
      "ForeignKey": foreignModel,
      "MappingKey": mappingModel
    }
  }
}

module.exports = (modelName)=> {
  return new ModelProcessor(modelName);
};