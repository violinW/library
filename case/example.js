'use strict';
const modelProcessor = require("./modelProcessor.js");
const BasicUseCase = require("./basicUseCase.js");
const dbName = "aaaaa";

return BasicUseCase(dbName, modelProcessor("Campaign").setMode("type_two"));

