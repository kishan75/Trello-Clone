var express = require('express');
var router = express.Router();
var auth = require('../controller').authorization;
var User = require('../Database').models.User;

router.use(auth.authenticateUser);

router.post('/', async (req, res) => { // create new board

    var {
        name,
        members
    } = req.body;
    if (!members.find(element => element == req.user))
        members.push(req.user.email);
    console.log(req.user);
    res.sendStatus(200);
});

router.put('/', async (req, res) => { // update existing board like add more people remove member

});

router.get('/', async (req, res) => { // get all board

});

router.get('/:boardId', async (req, res) => { // get details of specifc board

});


module.exports = router;