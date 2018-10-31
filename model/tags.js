const mongoose = require('mongoose');

const Tag = mongoose.Schema({
    tagName:{
        type: String,
        unique: true
    }

});

const Tags = module.exports = mongoose.model('Tag',Tag)

module.exports.addTag = (tag,callback) =>{
    Tags.create(tag,callback);
}
//find one
// module.exports.getPlaceInfoFromID = (id,callback,limit)=>{
//     const query = {_id:id}
//     Places.find({_id:query},callback).limit(limit)
// }

//find by name
// module.exports.getPlaceInfoFromName = (name,callback,limit)=>{
//     Places.find({placeName:name},callback).limit(limit)
// }
//find all
module.exports.getAllTags = (callback,limit)=>{
    Tags.find(callback).limit(limit)
}

//remove from Id
module.exports.removeTag = (id,callback)=>{
    const query = {_id:id}
    Places.remove(query,callback)
}


//update place from Id
// module.exports.updatePlace = (id,data,option,callback) =>{
//     const query = {_id : id}
//     const updatedData = {
//         placeName : data.placeName,
//         placeDes : data.placeDes,
//         tel : data.tel,
//         openTime : data.openTime,
//         closeTime : data.closeTime,
//         fee : data.fee,
//         carParking : data.carParking,
//         FileList : data.FileList,
//         days : data.days,
//         tags : data.tags,
//         editor: data.editor,
//         edit_date : data.edit_date,
//         images:data.images,
//         lat:data.lat,
//         lng:data.lng
//     }

//     Places.findOneAndUpdate(query,updatedData,option,callback)
// }

module.exports.updateActiveTag = (newTag,oldTag,option,callback) =>{
    // const newTag = {_id : id}
    // const oldTag = {}
    const updateOld = {
        tagStatus:false
    }
    const updateNew = {
        tagStatus:true
    }
   Tags.findOneAndUpdate({tagName:oldTag},updateOld,option,callback)

    Tags.findOneAndUpdate({tagName:newTag},updateNew,option,callback)

    // Places.findOneAndUpdate(query,updatedData,option,callback)
}