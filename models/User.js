const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    avatar: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }

});
//Call exported collection object USER and return when required in seperate script
module.exports = User = mongoose.model('users', UserSchema);