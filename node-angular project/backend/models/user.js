const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema= mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String,
    profileimage: {
        type:String, 
        default: "https://img.icons8.com/bubbles/100/000000/user.png"
    },
    address: {
        type:String, 
        default: ""
    },
    type: {
        type:String, 
        default: "user"
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);