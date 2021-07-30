var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors= require('cors');
var User= require('./models/user');


var passport= require('passport');
var LocalStrategy= require('passport-local');
passportLocalMongoose= require('passport-local-mongoose');
var session = require('express-session');

var app = express();

app.use(cors({
    origin: 'http://localhost:4200'
}));

mongoose.connect("mongodb://localhost:27017/finalproject",
{ useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{ console.log('Connected to Database')})
.catch((err)=>{ console.log(err)});

app.use(session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 120000
    }
  }));
  
  passport.serializeUser(User.serializeUser()); //Session encoding
  passport.deserializeUser(User.deserializeUser()); //Session decoding
  passport.use(new LocalStrategy(User.authenticate()));

//   passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
//   },(User.authenticate())
// ));
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  //Current user
  app.use((req,res,next)=>{
    res.locals.currentUser= req.user;
    next();
  })
  
  function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect("/users/login");
  }


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var productsRouter = require('./routes/products');
var profileRouter = require('./routes/profile');
var checkoutRouter = require('./routes/checkout');
var ordersRouter = require('./routes/orders');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/profile', profileRouter);
app.use('/products', productsRouter);
app.use('/admin', adminRouter);
app.use('/checkout', checkoutRouter);
app.use('/orders', ordersRouter);

module.exports = app;
