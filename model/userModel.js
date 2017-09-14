const mongoose = require('../lib/dbConnect');
const schema = require('../schema/userSchema');
const User = mongoose.model('User', schema);

module.exports = User;