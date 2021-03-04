const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TASK_STATUS = ["To-do", "In_development", "To_be_reviewed", "Finished"];

const schema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  board: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Board",
  },
  status: {
    type: String,
    enum: TASK_STATUS,
    default: TASK_STATUS[0],
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", schema);
