'use strict';

const modelTool = (modelList)=> {
  return modelList;
};

modelTool.fn = modelTool.prototype;
modelTool.fn.extendModel = (modelName, modelDefinition)=> {
  modelList[modelName] = modelDefinition;
};

module.exports = modelTool;