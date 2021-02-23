const mongoose = require('mongoose');
const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    boards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    }],
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('User', schema);