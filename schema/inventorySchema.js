const mongoose = require('../lib/dbConnect');
const Schema = mongoose.Schema;

const inventorySchema = 
    new Schema({
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        inventoryStock: String,
        inventorySize: String,
        inventoryPrice: Number
});

module.exports = inventorySchema;