const mongoose = require('mongoose');

const Place = mongoose.Schema({
    palceName:{
        type: String
    },
    placeDes:{
        type:String
    },
    FileList:{
        type:Array
    },
    tel:{
        type:String
    },
    openTime:{
        type:String
    },
    closeTime:{
        type:String
    },
    fee:{
        type:String
    },
    carParking:{
        type:String
    },
    days:{
        type:Array
    },
    tags:{
        type:Array
    },
    latLocation:{
        type:String
    },
    longLocation:{
        type:String
    },
    create_date:{
        type:Date,
        default: Date.now
    }
});

const Places = module.exports = mongoose.model('Place',Place)

module.exports.addPlace = (places,callback) =>{
    Places.create(places,callback);
}
//find one
module.exports.getPlaceInfoFromID = (id,callback,limit)=>{
    const query = {_id:id}
    Places.find({_id:query},callback).limit(limit)
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
