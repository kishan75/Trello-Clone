var express = require("express");
var router = express.Router();
var auth = require("../controller").authorization;
var mongoose = require("mongoose");
var model = require("../Database").models;
var common = require("../common");

router.use(auth.authenticateUser);

router.post("/", async (req, res) => {
  // create new board

  var { name, members } = req.body;
  members = !members ? [] : typeof members !== Array ? [members] : members;

  if (!members.find((element) => element == req.user.email))
    members.push(req.user.email);

  const board = new model.Board({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    members: members,
  });
  board.save((err) => {
    if (err) common.handleError(err, 500, res);

    const filter = {
      email: {
        $in: members,
      },
    };
    const update = {
      $addToSet: {
        boards: board._id,
      },
    };

    model.User.updateMany(filter, update, (err, response) => {
      if (err) common.handleError(err, res, 500);

        board.populate('members').execPopulate((err, board) => {
        if (err) return common.handleError(err.message, 500, res);
        res.status(200).type("json").send(JSON.stringify(board));
      });
    });
  });
});

router.put("/addMember", async (req, res) => {
  // update existing board like add more people remove member
  const { boardId, memberId } = req.body;
  const update = {
    $addToSet: {
      boards: boardId,
    },
  };
  var option = {
    new: true,
  };
  model.User.findByIdAndUpdate(memberId, update, option, (err, user) => {
    if (err || !user)
      return common.handleError(null, 404, res, `user doesn't exist`);
    const addMemberQuery = {
      $addToSet: {
        members: memberId,
      },
    };
    model.Board.findByIdAndUpdate(
      boardId,
      addMemberQuery,
      option,
      (err, result) => {
        if (err) common.handleError(err, 500, res);
        res.status(200).type("json").send(JSON.stringify(result));
      }
    );
  });
});

router.put("/removeMember", async (req, res) => {
  // update existing board like add more people remove member
  const { boardId, memberId } = req.body;
  const update = {
    $pull: {
      boards: boardId,
    },
  };
  var option = {
    new: true,
  };
  model.User.findByIdAndUpdate(memberId, update, option, (err, user) => {
    if (err || !user)
      return common.handleError(null, 404, res, `user doesn't exist`);
    const removeMemberQuery = {
      $pull: {
        members: memberId,
      },
    };
    model.Board.findByIdAndUpdate(
      boardId,
      removeMemberQuery,
      option,
      (err, result) => {
        if (err) common.handleError(err, 500, res);
        res.status(200).type("json").send(result);
      }
    );
  });
});

router.get("/", async (req, res) => {
  // get all board
  model.User.findOne({
    email: req.user.email,
  })
    .populate("boards")
    .exec((err, boards) => {
      if (err) return common.handleError(err.message, 500, res);
      res.status(200).type("json").send(JSON.stringify(boards));
    });
});

router.get("/:boardId", async (req, res) => {
  // get details of specifc board
  model.Board.findById(req.params.boardId, (err, board) => {
    if (err) return common.handleError(err.message, 404, res);
    if (!board) return common.handleError(null, 404, res, "board not found");
    res.status(200).type("json").send(JSON.stringify(board));
  });
});

module.exports = router;
