var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/auth', require('./user'));
//router.use('/board', require('./board'));
//router.use('/task/:boardId', require('./task'));

//router.use('*', require('./board'));

module.exports = router;
