const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    age: {
        type: String
    },
    email: {
        type: String
    },
    website: {
        type: String
    }
})

const userModel = mongoose.model('User', userSchema);
module.exports = userModel