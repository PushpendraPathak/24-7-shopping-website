const mongoose = require('mongoose');
const productsSchema= mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    discountPrice: Number,
    description: String,
    image: String,
    createdOn: {
        type:Date, 
        default: Date.now()
    },
    isTopProduct: {
        type:Boolean, 
        default: false
    },
});

module.exports = mongoose.model('Products', productsSchema);