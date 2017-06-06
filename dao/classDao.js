'use strict';
const modelProcessor = require("../case/modelProcessor.js");
const BasicUseCase = require("../case/basicUseCase.js");
const _ = require('lodash');

module.exports = (dbName)=> {
  const CourseMethods = BasicUseCase(dbName, modelProcessor("Course").setMode("type_two"));
  const ClassMethods = BasicUseCase(dbName, modelProcessor("Class").setMode("type_two"));

  return {
    addCourse: function (req, res, next) {
      return CourseMethods.addSimpleList(req.body)
        .then((data)=>{
          console.log(data)
          res.send('success');
        })
        .catch((error)=>{
          console.log(error)
          res.send('fail');
        });
    },
    addClass:function(req, res, next){
      return ClassMethods.addJoinData(req.body)
        .then((data)=>{
          console.log(data)
          res.send('success');
        })
        .catch((error)=>{
          console.log(error)
          res.send('fail');
        });
    }
  }
}