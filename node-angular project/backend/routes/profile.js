var express = require('express');
var router = express.Router();
var User= require('../models/user');

//finds profile by id and returns it
router.post('/:id',(req, res, next)=> {
    User.findById(req.params.id, (err,user)=>{
        if (err) { return next(err); }
        var result= {
            "status": "success",
            "profile": user
        }
        res.send(result);
    })
}
);

router.delete('/image/:id',(req,res)=>{
        User.findByIdAndUpdate(req.params.id, { profileimage: '' } ,(err)=>{
            if (err) { return next(err); }
        var result={
            "status": "success",
            "message": "profile image deleted successfully"
        }
        res.send(result);
        })
    })

router.post('/image/:id',(req,res)=>{
    User.findByIdAndUpdate(req.params.id, { profileimage: req.body.profileimage } ,(err)=>{
        if (err) {
            var result={
                "status": "success",
                "message": "profile image updated successfully"
            }
            return res.send(result);
        }
    var result={
        "status": "success",
        "message": "profile image updated successfully"
    }
    return res.send(result);
    })
})

router.post('/address/:id',(req,res)=>{
    User.findByIdAndUpdate(req.params.id, { address: req.body.address } ,(err)=>{
        if (err) { return next(err); }
    var result={
        "status": "success",
        "message": "profile address updated successfully"
    }
    res.send(result);
    })
})

module.exports = router;
