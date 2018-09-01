const mongoose = require('mongoose');

const Place = mongoose.Schema({
    placeName:{
        type: String
    },
    placeDes:{
        type:String
    },
    images:{
        type:Array
    },
    IP:{
        type:String
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
    editor:{
        type:String
    },
    edit_date:{       
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
        images:data.images
    }

    Places.findOneAndUpdate(query,updatedData,option,callback)
}
