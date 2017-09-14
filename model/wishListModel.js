const mongoose = require('../lib/dbConnect');
const schema = require('../schema/wishListSchema');
const WishList = mongoose.model('WishList', schema);

module.exports = WishList;