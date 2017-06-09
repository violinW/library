var express = require('express');
var router = express.Router();
var dbName = "mydb";

const Assistent = require('../assistant/index');
const Anne = Assistent.Anne;
var ClassDao = require('../dao/classDao')(dbName, Anne);

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 添加学生数据
router.post('/addCourse', function (req, res, next) {
  ClassDao.addCourse(req, res, next)
});

// 添加学生数据
router.post('/addClass', function (req, res, next) {
  ClassDao.addClass(req, res, next)
});

// 查询所有班级
router.get('/getAllClass', function (req, res, next) {
  ClassDao.getAllClass(req, res, next)
});

// 查询所有班级及其相关数据
router.get('/getAllClassInfo', function (req, res, next) {
  ClassDao.getAllClassInfo(req, res, next)
});

//查询某学生所在班级
router.get('/getStuClass', function (req, res, next) {
  ClassDao.getStuClass(req, res, next)
});

// 查询某学生的详情
router.get('/getStudentDetail', function (req, res, next) {
  ClassDao.getStudentDetail(req, res, next)
});

// 查询某学生的名称
router.get('/getStudentName', function (req, res, next) {
  ClassDao.getStudentName(req, res, next)
});


module.exports = router;
