var express = require('express');
var router = express.Router();
// var auth = require('./autherization');
var User = require('../Database').models.User;

router.post('/', async (req, res) => {                            // create task

});

router.put('/', async (req, res) => {                             // update task like add more people change status

});

router.get('/:boardId', async (req, res) => {                    // get all task from any board

});

router.get('/:boardId/taskId', async (req, res) => {                  // get a specific task from any specific board

});



module.exports = router;