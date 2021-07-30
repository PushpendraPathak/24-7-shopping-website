var express = require('express');
var router = express.Router();
var User= require('../models/user');
var Products= require('../models/products');

router.get('/', (req, res, next) => {
    Products.find((err,products)=>{
        if (err) { return next(err); }
        var result={
            "status": "success",
            "message": products
        }
    res.send(result);
    })
});

router.get('/:id',(req, res, next)=> {
    Products.findById(req.params.id, (err,product)=>{
        if (err) { return next(err); }
        var result={
            "status": "success",
            "message": product
        }
    res.send(result);    
})
});

module.exports = router;
