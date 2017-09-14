const mongoose = require('../lib/dbConnect');
const schema = require('../schema/shoppingCartSchema');
const ShoppingCart = mongoose.model('ShoppingCart', schema);

module.exports = ShoppingCart;