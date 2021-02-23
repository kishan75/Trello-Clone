const mongoose = require('mongoose');
const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    board: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Board'
    },
    status: {
        type: String,
        enum: ['To-do', 'In development', 'To be reviewed', 'Finished'],
        default: 'To-do'
    },
    members: [{
        type: String,
        ref: 'User'
    }],
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Task', schema);