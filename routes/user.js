var express = require("express");
var router = express.Router();
var auth = require("../controller").authorization;
var User = require("../Database").models.User;
var common = require("../common");
var mongoose = require("mongoose");

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  var hashedPassword = await auth.generateHash(password);

  var user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    email: email,
    password: hashedPassword,
  });
  const accessToken = await auth.generateToken({
    email: email,
    id: user._id,
  });
  user.save((err) => {
    if (err) common.handleError(err, 400, res);
    else
      res.status(200).type("json").send({
        accessToken: accessToken,
      });
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email: email,
  }).exec();
  if (user) {
    const match = await auth.compareHash(password, user.password);
    if (match) {
      const accessToken = await auth.generateToken({
        email: email,
        id: user._id,
      });
      res.status(200).type("json").send({
        accessToken: accessToken,
      });
    } else {
      res.status(401).type("json").send({
        reason: "password mismatch",
      });
    }
  } else
    res.status(404).type("json").send({
      reason: "user doesnt exist",
    });
});

router.get("/users/:boardId?", auth.authenticateUser, async (req, res) => {
  // users not part of that board
  var filter = req.params.boardId
    ? { boards: { $ne: req.params.boardId } }
    : { _id: { $ne: req.user.id } };

  var users = await User.find(filter, "name _id").exec();
  res.status(200).type("json").send(users);
});

module.exports = router;
