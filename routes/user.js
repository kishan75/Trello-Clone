var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
    const {
        name,
        email,
        password
    } = req.body; 
    console.log(req.body);
    res.sendStatus(200);
});

module.exports = router;