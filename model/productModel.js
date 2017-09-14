const mongoose = require('../lib/dbConnect');
const schema = require('../schema/productSchema');
const Product = mongoose.model('Product', schema);

module.exports = Product;