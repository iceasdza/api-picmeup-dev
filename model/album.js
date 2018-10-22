const mongoose = require('mongoose');

const Album = mongoose.Schema({
    albumName:{
        type: String
    },
    albumDes:{
        type:String
    },
    images:{
        type:Array
    },
    comments:{
        type:Array
    },
    albumOwner:{
        type:String
    },
    createDate:{
        type:Date,
        default: Date.now
    }
});

const Albums = module.exports = mongoose.model('Album',Album)

module.exports.addAlbum = (Album,callback) =>{
    Albums.create(Album,callback);
}
//find one
module.exports.getPlaceInfoFromID = (id,callback,limit)=>{
    const query = {_id:id}
    Album.find({_id:query},callback).limit(limit)
}

//find by name
module.exports.getPlaceInfoFromName = (name,callback,limit)=>{
    Album.find({placeName:name},callback).limit(limit)
}
//find all
module.exports.getPlaceInfo = (callback,limit)=>{
    Album.find(callback).limit(limit)
}

//remove from Id
module.exports.DeletePlaceFromId = (id,callback)=>{
    const query = {_id:id}
    Album.remove(query,callback)
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
        lat:data.lat,
        lng:data.lng
    }

    Album.findOneAndUpdate(query,updatedData,option,callback)
}

module.exports.updateComments = (id,data,option,callback) =>{
    const query = {_id : id}
    const updatedData = {
        comments:data.comments
    }

    Album.findOneAndUpdate(query,updatedData,option,callback)
}