const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const SALT_WORK_FACTOR = 12

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

module.exports.checkUser = (user,password,callback)=>{
    Register.findOne({ userName: user }, function(err, user) {
        if(user === null){
            callback(err,{isAuthen:false}) 
            return
        }
        if (err) throw err;
        bcrypt.compare(password,user.password,(err,isMatch)=>{
            if(err){
                throw err
            }
            callback(err,{isAuthen:isMatch})
            return isMatch
            
        })
        
    });
}

module.exports.register = (event,next)=>{
     bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
        if(err){
            console.log(err)
            return next(err)
        }

        bcrypt.hash(event.password,salt,(err,hash)=>{
            if(err){
                console.log(err)
                return(next(err))
            }
            event.password = hash;
            Register.create(event,next)
        })
    })
}

module.exports.checkUsername = (_name,callback)=>{
    Register.findOne({userName:_name},callback)
}

module.exports.checkEmail = (_email,callback)=>{
    Register.findOne({email:_email},callback)
    
}