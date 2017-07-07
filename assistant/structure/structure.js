'use strict';
const enum_structure = require('./enum/enumDefinition.js');
const dataType = require('./transfer/dataType.js');

const structure = {
    enum_type: enum_structure,
    dataType: dataType(enum_structure)
};

module.exports = structure;