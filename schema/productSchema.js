const mongoose = require('../lib/dbConnect');
const Schema = mongoose.Schema;

const productSchema = 
    new Schema({
        productId: Number,
        productDescription: String,
        productImageURL: String
});

module.exports = productSchema;