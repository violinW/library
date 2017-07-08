'use strict';
module.exports = (dbName, Anne)=> {
  const {businessModel, logger} = Anne.CommonReferences;
  const {CommonUseCase, dataStructure} = businessModel;

  const StudentMethods = CommonUseCase(dbName, "Student", "type_one");
  const CourseMethods = CommonUseCase(dbName, "Course", "type_two");
  const ClassMethods = CommonUseCase(dbName, "Class", "type_one");

  return {
    addCourse(req, res, next) {
      return CourseMethods.addSimpleList(req.body)
        .then((data)=> {
          logger.trace(data);
          res.send('success');
        })
        .catch((error)=> {
          logger.trace(error);
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
          const result = dataStructure.getModel('testClass').displayToSource([{
            "id": 65,
            "name": "一年级一班",
            "grade": "grade_one",
            "student_class_mappingList": [{
              "id": 1,
              "join_time": "2017-08-31T16:00:00.000Z",
              "class_id": 65,
              "student_id": 1,
              "name": "王宇",
              "age": "15",
              "sex": "男"
            }, {
              "id": 2,
              "join_time": "2017-08-31T16:00:00.000Z",
              "class_id": 65,
              "student_id": 2,
              "name": "郑圆",
              "age": "14",
              "sex": "女"
            }]
          }]);
          res.send(result);
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