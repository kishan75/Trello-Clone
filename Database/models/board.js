const mongoose = require('mongoose');
const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    members: [{
        type: String,
        ref: 'User'
    }],
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Board', schema);