// Connect to db
var mongoose = require('mongoose');

// use native promises
mongoose.Promise = global.Promise;

// Using `mongoose.connect`...
var promise = mongoose.connect('mongodb://test:test@ds133964.mlab.com:33964/wishlist', {
  useMongoClient: true,
  /* other options */
});

module.exports = mongoose;