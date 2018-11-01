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
        default:false
    },
    avatar:{
        type:String
    },
    sendDate:{
        type:String
    }
});

const Inboxes = module.exports = mongoose.model('Inbox',Inbox)

module.exports.sendMessage = (places,callback) =>{
    Inboxes.create(places,callback);
}

//find by name
module.exports.getMessageFromName = (name,callback,limit)=>{
    Inboxes.find({reciver:name},callback).limit(limit)
}


//find one
module.exports.getPlaceInfoFromID = (id,callback,limit)=>{
    const query = {_id:id}
    Places.find({_id:query},callback).limit(limit)
}


module.exports.getPlaceFromTag = (activity,callback,limit)=>{
    Places.find({activities:activity},callback).limit(limit)
}
//find all
module.exports.getPlaceInfo = (callback,limit)=>{
    Places.find(callback).limit(limit)
}

//remove from Id
module.exports.DeletePlaceFromId = (id,callback)=>{
    const query = {_id:id}
    Places.remove(query,callback)
}


//update place from Id
module.exports.updatePlace = (id,data,option,callback) =>{
    const query = {_id : id}
    const updatedData = {
        placeName : data.placeName,
        placeDes : data.placeDes,
        tel : data.tel,
        openTime : data.openTime,
        closeTime : data.closeTime,
        fee : data.fee,
        carParking : data.carParking,
        FileList : data.FileList,
        days : data.days,
        tags : data.tags,
        editor: data.editor,
        edit_date : data.edit_date,
        images:data.images,
        activities:data.activities,
        lat:data.lat,
        lng:data.lng
    }

    Places.findOneAndUpdate(query,updatedData,option,callback)
}

module.exports.updateComments = (id,data,option,callback) =>{
    const query = {_id : id}
    const updatedData = {
        comments:data.comments
    }

    Places.findOneAndUpdate(query,updatedData,option,callback)
}