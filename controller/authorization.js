const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var generateToken = async (payload) => {
    const token = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    return token;
};

var verifyToken = async (token) => {
    const payload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return payload;
};

var generateHash = async (data, saltRounds = 10) => {
    const hash = bcrypt.hash(data, saltRounds);
    return hash;
};

var compareHash = async (textString, hashedString) => {
    const match = await bcrypt.compare(textString, hashedString);
    return match;
};

var authenticateUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err)
            res.sendStatus(403);
        req.user = user;
        next();
    })
};

module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken,
    generateHash: generateHash,
    compareHash: compareHash,
    authenticateUser: authenticateUser
}