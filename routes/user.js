var express = require('express');
var router = express.Router();
var auth = require('../controller').authorization;
var User = require('../Database').models.User;

router.post('/signup', async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;
    var hashedPassword = await auth.generateHash(password);

    var user = new User({
        name: name,
        email: email,
        password: hashedPassword
    });
    const accessToken = await auth.generateToken({
        email: email
    });
    user.save(err => {
        if (err) {
            console.log(err);;
            res.status(400).type('json').send({
                reason: err.message
            });
        } else {
            res.status(200).type('json').send({
                accessToken: accessToken
            });
        }
    });

});

router.post('/login', async (req, res) => {
    const {
        email,
        password
    } = req.body;
    const user = await User.findOne({
        email: email
    }).exec();
    if (user) {
        const match = await auth.compareHash(password, user.password);
        if (match) {
            const accessToken = await auth.generateToken(req.body);
            res.status(200).type('json').send({
                accessToken: accessToken
            });
        } else {
            res.status(401).type('json').send({
                reason: 'password mismatch'
            });
        }
    } else
        res.status(404).type('json').send({
            reason: 'user doesnt exist'
        });
});



module.exports = router;