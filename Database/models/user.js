const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    boards: [{
        type: Schema.Types.ObjectId,
        ref: 'Board'
    }],
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('User', schema);