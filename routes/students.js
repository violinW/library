var express = require('express');
var router = express.Router();

var studentsDao = require('../dao/studentsDao')("SCManagement");

/* GET users listing. */
router.get('/', function(req, res, next) {
    //res.send('respond with a resource');
    res.render('updateUser');
});


// 添加学生数据
router.post('/addStudent', function(req, res, next) {
    studentsDao.addStudent(req, res, next);
});


module.exports = router;
