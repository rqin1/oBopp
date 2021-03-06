const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    phone: String,
    password: String,
    cams: [String]
});

const User = mongoose.model('User', userSchema);

module.exports = { User }
