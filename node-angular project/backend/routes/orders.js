var express = require('express');
var router = express.Router();
var User= require('../models/user');
var Products= require('../models/products');
var Orders= require('../models/orders');

//make a new order- extra
router.post('/create',(req,res)=>{
    var neworder= new Orders({
        userid: req.body.userid,
        username: req.body.username,
        ordersum: req.body.ordersum,
        cart: req.body.cart
    });
    Orders.create(neworder,(err)=>{
        if (err) { 
            var result={
                "status": "failure",
                "message": "cant add order"
            }
            return res.send(result);
         }
        var result={
            "status": "success",
            "message": "product added successfully"
        }
    res.send(result);     
})
    
    });

//fetch all orders
router.get('/', (req, res, next) => {
    Orders.find((err,orders)=>{
        if (err) { return next(err); }
        var result={
            "status": "success",
            "message": orders
        }
    res.send(result);
    })
});


// displaying order of current user, please pass userid
router.get('/:userid', (req, res, next)=> {
    Orders.find({userid: req.params.userid}, (err,order)=>{
        if (err) {
            var result={
                "status": "failure",
                "message": "cant find order"
            }
            return res.send(result);
        }
        var result={
            "status": "success",
            "orders": order
        }
    return res.send(result);   
    })
});

//admin updating stuff, pass order id
router.post('/:id',(req, res, next)=> {
    Orders.findByIdAndUpdate(req.params.id, {isDelivered: req.body.isDelivered} ,(err)=>{
        if (err) { 
            var result={
                "status": "failure",
                "message": "cant update product details"
            }
            return res.send(result);
        }
        var result={
            "status": "success",
            "message": "order edited successfully"
        }
    res.send(result);    
})
});

router.delete('/:id', (req,res)=>{
    Orders.findById(req.params.id, (err,order)=>{
        if(err){
            var result={
                "status": "failure",
                "message": "cant delete product"
            }
            return res.send(result);
        }
        if(!order) return res.status(404).send("Order does not exist with this ID");
    })
    Orders.findByIdAndRemove(req.params.id,(err)=>{
        if(err){
            var result={
                "status": "failure",
                "message": "cant delete product"
            }
            return res.send(result);
        }
        var result={
            "status": "success",
            "message": "order deleted successfully"
        }
    return res.send(result);       
})
});


module.exports = router;
