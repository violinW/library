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


module.exports = router;
