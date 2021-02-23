var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;
    const accessToken = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET);
    res.status(200).type('json').send({
        accessToken: accessToken
    });
});

module.exports = router;