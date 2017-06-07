'use strict';
const modelList = require("./modelList.js");
const modelProcessor = require("../modelProcessor.js")(modelList);
const BasicUseCase = require("../usecase/basicUseCase.js");
const dbName = "testDB";

return BasicUseCase(dbName, modelProcessor("Campaign").setMode("type_two"));

