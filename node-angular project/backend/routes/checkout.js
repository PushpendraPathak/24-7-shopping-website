var express = require('express');
var router = express.Router();
var User= require('../models/user');
var Products= require('../models/products');
var Orders= require('../models/orders');

router.get('/', (req, res, next) => {
    var order= {
        userid: req.body.userid,
        username: req.body.username,
        cart: req.body.cart
    }
    Orders.create(order,(err)=>{
        if (err){
            var result={
                "status": "failure",
                "message": "cant add order"
            }
            return res.send(result);
        }
        var result={
            "status": "success",
            "message": "Order placed successfully"
        }
    return res.send(result);      
})
});


module.exports = router;
