'use strict';
const modelList = require("../case/modelList.js");
const modelProcessor = require("../jsTemplateGenerator/new/businessModel/modelProcessor.js")(modelList);
const BasicUseCase = require("../jsTemplateGenerator/new/businessModel/usecase/basicUseCase.js");
const _ = require('lodash');
const Logger = require('logger-romens');
const logger = new Logger();

module.exports = (dbName)=> {
  const StudentMethods = BasicUseCase(dbName, modelProcessor("Student").setMode("type_one"));
  const CourseMethods = BasicUseCase(dbName, modelProcessor("Course").setMode("type_two"));
  const ClassMethods = BasicUseCase(dbName, modelProcessor("Class").setMode("type_two"));

  return {
    addCourse(req, res, next) {
      return CourseMethods.addSimpleList(req.body)
        .then((data)=> {
          console.log(data);
          res.send('success');
        })
        .catch((error)=> {
          console.log(error);
          res.send('fail');
        });
    },
    addClass(req, res, next){
      return ClassMethods.addJoinData(req.body)
        .then((data)=> {
          logger.trace(data);
          res.send('success');
        })
        .catch((error)=> {
          logger.trace(error);
          res.send('fail');
        });
    },
    getAllClass(req, res, next){
      return ClassMethods.getList({}, null, null, 20, 1, 'id')
        .then((data)=> {
          logger.trace(data);
          res.send(data);
        })
        .catch((error)=> {
          logger.trace(error);
          res.send('fail');
        });
    },
    getAllClassInfo(req, res, next){
      return ClassMethods.getJoinList({}, null, null, 20, 1, 'id')
        .then((data)=> {
          logger.trace(data);
          res.send(data);
        })
        .catch((error)=> {
          logger.trace(error);
          res.send('fail');
        });
    },
    getStuClass(req, res, next){
      return StudentMethods.getJoinDetail(req.query.id)
        .then((data)=> {
          logger.trace(data);
          res.send(data);
        })
        .catch((error)=> {
          logger.trace(error);
          res.send('fail');
        });
    },
    getStudentDetail(req, res, next){
      return StudentMethods.getSimpleDetail('id', req.query.id)
        .then((data)=> {
          logger.trace(data);
          res.send(data[0]);
        })
        .catch((error)=> {
          logger.trace(error);
          res.send('fail');
        });
    },
    getStudentName(req, res, next){
      return StudentMethods.getFieldById(req.query.id, 'name')
        .then((data)=> {
          logger.trace(data);
          res.send(data[0].name);
        })
        .catch((error)=> {
          logger.trace(error);
          res.send('fail');
        });
    }
  }
}