var express = require("express");
var router = express.Router();
var User = require("../Database").models.User;
var model = require("../Database").models;
var common = require("../common");
var mongoose = require("mongoose");

router.post("/", async (req, res) => {
  // create task
  let { title, members, boardId, status, description } = req.body;
  members = !members ? [] : members.constructor === Array ? members : [members];

  const session = await mongoose.startSession();
  session.startTransaction();

  const task = new model.Task({
    _id: new mongoose.Types.ObjectId(),
    title: title,
    members: members ? members : [],
    status: status,
    board: boardId,
    description: description,
  });

  task.save((err) => {
    if (err) return common.handleError(err, 500, res);
    const addTaskQuery = {
      $addToSet: {
        tasks: task._id,
      },
    };
    model.Board.findByIdAndUpdate(
      boardId,
      addTaskQuery,
      {
        new: true,
      },
      async (err, result) => {
        if (err) return common.handleError(err, 500, res);
        await session.commitTransaction();
        session.endSession();
        res.status(200).type("json").send(JSON.stringify(task));
      }
    );
  });
});

router.put("/addMember", async (req, res) => {
  // update task like add more people change status

  const { taskId, memberId } = req.body;

  var option = {
    new: true,
  };
  const addMemberQuery = {
    $addToSet: {
      members: memberId,
    },
  };
  model.Task.findByIdAndUpdate(
    taskId,
    addMemberQuery,
    option,
    (err, result) => {
      if (err) common.handleError(err, 500, res);
      res.status(200).type("json").send(JSON.stringify(result));
    }
  );
});

router.put("/removeMember", async (req, res) => {
  // update task like add more people change status
  const { taskId, memberId } = req.body;

  var option = {
    new: true,
  };
  const removeMemberQuery = {
    $pull: {
      members: memberId,
    },
  };
  model.Task.findByIdAndUpdate(
    taskId,
    removeMemberQuery,
    option,
    (err, result) => {
      if (err) common.handleError(err, 500, res);
      res.status(200).type("json").send(JSON.stringify(result));
    }
  );
});

router.put("/editTaskDetail", async (req, res) => {
  // update task like add more people change status

  const { title, status, description, taskId } = req.body;
  const updateQuery = {
    title: title,
    status: status,
    description: description,
  };
  model.Task.findByIdAndUpdate(
    taskId,
    updateQuery,
    {
      new: true,
    },
    (err, task) => {
      if (err) return common.handleError(err, 500, res);
      res.status(200).type("json").send(JSON.stringify(task));
    }
  );
});

router.get("/:boardId", async (req, res) => {
  // get all task from any board

  model.Board.findById(req.params.boardId)
    .populate({
      path: "tasks",
      select: "title _id description",
      populate: { path: "members", select: "name -_id" },
    })
    .exec((err, tasks) => {
      if (err) return common.handleError(err.message, 500, res);
      res.status(200).type("json").send(JSON.stringify(tasks.tasks));
    });
});

router.get("/:taskId", async (req, res) => {
  // get a specific task from any specific board

  model.Board.findById(req.params.taskId, (err, task) => {
    if (err) return common.handleError(err.message, 404, res);
    if (!task) return common.handleError(null, 404, res, "board not found");
    res.status(200).type("json").send(JSON.stringify(task));
  });
});

module.exports = router;
