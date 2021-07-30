const mongoose = require('mongoose');
const ordersSchema= mongoose.Schema({
    userid: String,
    username: String,
    ordersum: Number,
    orderPlacedOn: {
        type:Date, 
        default: Date.now()
    },
    isDelivered: {
        type:Boolean, 
        default: false
    },
    orderDeliveredOn: {
        type:Date, 
        default: Date.now()
    },
    cart: []
});

module.exports = mongoose.model('Orders', ordersSchema);