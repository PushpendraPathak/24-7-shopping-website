var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport= require('passport');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      var result= {
        "status":"failure",
        "message": "User and password not found"
    }
       return res.send(result); }
    
      req.logIn(user, function(err) {
      if (err) { return next(err); }
      var result= {
        "status": "success",
        "message": "user logged in successfully",
        "_id": user._id,
        "type": user.type,
        "firstName": user.firstName,
        "username": user.username
      }
      return res.send(result);
    });
  })(req, res, next);
});

router.post('/register', (req,res)=>{
  var newuser= new User({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });

  User.register(newuser,req.body.password, function(err,user){
    if (err){
      console.log(err);
      var result1= {
        "status": "failure",
        "message": "Unable to register- username exists"
      }
      return res.send(result1);
    }
      var result1= {
        "status": "success",
        "message": "user registered successfully"
      }
      return res.send(result1);
    })
  
  });

router.post('/forgot', function(req, res, next) {
      User.findOne({ username: req.body.username }, function(err, user) {
        if (!user) {
          var result1= {
            "status": "failure",
            "message": "No account with that username address exists."
          }
          return res.send(result1);
        }
        var newuser ={
          username: user.username,
          password: req.body.password,
      };
      console.log(newuser.password);
      User.findByIdAndUpdate(user.id, {password : req.body.password} ,(err)=>{
          if(err) {
            var result1= {
              "status": "failure",
              "message": "Unable to update password"
            }
            return res.send(result1);
          }
          var result1= {
            "status": "success",
            "message": "password updated successfully"
          }
          return res.send(result1);      })
      });
    }),

module.exports = router;
