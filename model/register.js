const mongoose = require('mongoose');

const RegisterData = mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    gender:{
        type:String
    },
    dateOfBith:{
        type:String
    },
    userName:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
    tel:{
        type:String
    },
    status:{
        type:Array
    },
    files:{
        type:String
    }
})

const Register = module.exports = mongoose.model('RegisterData',RegisterData);

module.exports.register = (event,callback)=>{
    Register.create(event,callback)
}