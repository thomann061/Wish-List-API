const mongoose = require('../lib/dbConnect');
const schema = require('../schema/inventorySchema');
const Inventory = mongoose.model('Inventory', schema);

module.exports = Inventory;