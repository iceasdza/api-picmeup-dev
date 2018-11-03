const mongoose = require('mongoose');

const Inbox = mongoose.Schema({
    content:{
        type: String
    },
    sender:{
        type:String
    },
    reciver:{
        type:String
    },
    status:{
        type:Boolean,
        default:true
    },
    avatar:{
        type:String
    },
    sendDate:{
        type:String
    },
    createDate:{
        type:Date,
        default:Date.now()
    }
});

const Inboxes = module.exports = mongoose.model('Inbox',Inbox)

module.exports.sendMessage = (places,callback) =>{
    Inboxes.create(places,callback);
}

//find by name
module.exports.getMessageFromName = (name,callback)=>{
    Inboxes.find({reciver:name},null,{sort: {_id: -1}},callback)
}

module.exports.changeMessageState = (id,option,callback) =>{
    const query = {_id : id}
    const updatedData = {
        status:false
    }

    Inboxes.findOneAndUpdate(query,updatedData,option,callback)
}

// module.exports.updateComments = (id,data,option,callback) =>{
//     const query = {_id : id}
//     const updatedData = {
//         comments:data.comments
//     }

//     Places.findOneAndUpdate(query,updatedData,option,callback)
// }