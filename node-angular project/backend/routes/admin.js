var express = require('express');
var router = express.Router();
var User= require('../models/user');
var Products= require('../models/products');

//add product by admin
router.post('/products', (req, res)=> {
    var product = new Products(req.body);
    Products.create(product,(err)=>{
        if (err) { 
            var result={
                "status": "failure",
                "message": "cant add product"
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

router.post('/products/:id',(req, res, next)=> {
    var newprod= {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        discountPrice: req.body.discountPrice,
        description: req.body.description,
        image: req.body.image,
        createdOn: Date.now(),
        isTopProduct: true
    }
    Products.findByIdAndUpdate(req.params.id, newprod ,(err)=>{
        if (err) { 
            var result={
                "status": "failure",
                "message": "cant update product details"
            }
            return res.send(result);
        }
        var result={
            "status": "success",
            "message": "product edited successfully"
        }
    res.send(result);    
})
});

router.delete('/products/:id', (req,res)=>{
    Products.findById(req.params.id, (err,product)=>{
        if(err){
            var result={
                "status": "failure",
                "message": "cant delete product"
            }
            return res.send(result);
        }
        if(!product) return res.status(404).send("Product does not exist with this ID");
    })
    Products.findByIdAndRemove(req.params.id,(err)=>{
        if(err){
            var result={
                "status": "failure",
                "message": "cant delete product"
            }
            return res.send(result);
        }
        var result={
            "status": "success",
            "message": "product deleted successfully"
        }
    res.send(result);       
})
});

module.exports = router;
