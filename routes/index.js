var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* 项目助手说明 */
router.get('/introduction', function(req, res, next) {
  res.render('introduction', { title: 'Express' });
});

module.exports = router;
