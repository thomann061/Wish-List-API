const mongoose = require('../lib/dbConnect');
const Schema = mongoose.Schema;

const shoppingCartSchema = 
    new Schema({
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number
});

module.exports = shoppingCartSchema;