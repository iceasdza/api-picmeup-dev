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
    avatar:{
        type:String
    }
})

const Register = module.exports = mongoose.model('RegisterData',RegisterData);

module.exports.register = (event,callback)=>{
    Register.create(event,callback)
}

module.exports.checkUsername = (_name,callback)=>{
    Register.findOne({userName:_name},callback)
}

module.exports.checkEmail = (_email,callback)=>{
    Register.findOne({email:_email},callback)
    
}