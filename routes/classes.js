var express = require('express');
var router = express.Router();
var dbName="mydb";

var studentsDao = require('../dao/classDao')(dbName);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 添加学生数据
router.post('/addCourse', function(req, res, next) {
  studentsDao.addCourse(req, res, next)
});

// 添加学生数据
router.post('/addClass', function(req, res, next) {
  studentsDao.addClass(req, res, next)
});

// 查询所有班级
router.get('/getAllClass', function(req, res, next) {
  studentsDao.getAllClass(req, res, next)
});

// 查询所有班级及其相关数据
router.get('/getAllClassInfo', function(req, res, next) {
  studentsDao.getAllClassInfo(req, res, next)
});

//查询某学生所在班级
router.get('/getStuClass', function(req, res, next) {
  studentsDao.getStuClass(req, res, next)
});

// 查询某学生的详情
router.get('/getStudentDetail', function(req, res, next) {
  studentsDao.getStudentDetail(req, res, next)
});

// 查询某学生的名称
router.get('/getStudentName', function(req, res, next) {
  studentsDao.getStudentName(req, res, next)
});


module.exports = router;
