const { Schema, model } = require('mongoose');
const productModel = require('./product.model')

const cartSchema = new Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    products: [{ 
        type: Schema.Types.ObjectId, 
        ref: productModel 
    }],
    timestamp: {
        type: Date,
        default: () => Date.now() / 1000,
    }
});

const cartModel = model('carts', cartSchema);

module.exports = cartModel;