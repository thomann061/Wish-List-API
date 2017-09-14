const mongoose = require('../lib/dbConnect');
const Schema = mongoose.Schema;

const userSchema = 
    new Schema({
        username: String,
        userEmail: String
});

module.exports = userSchema;