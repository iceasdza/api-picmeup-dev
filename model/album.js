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
module.exports.getAlbumFromId = (id,callback,limit)=>{
    const query = {_id:id}
    Albums.find({_id:query},callback).limit(limit)
}

//find by name
module.exports.getAlbumsFromId = (id,callback,limit)=>{
    Albums.find({_id:id},callback).limit(limit)
}
//find all
module.exports.getAlbums = (callback,limit)=>{
    Albums.find(callback).limit(limit)
}

//remove from Id
module.exports.DeletePlaceFromId = (id,callback)=>{
    const query = {_id:id}
    Album.remove(query,callback)
}


//update place from Id
module.exports.updateAlbum = (id,data,option,callback) =>{
    const query = {_id : id}
    const updatedData = {
            albumName:data.albumName,
            albumDes:data.albumDes,
            images:data.images
    }

    Albums.findOneAndUpdate(query,updatedData,option,callback)
}

module.exports.updateComments = (id,data,option,callback) =>{
    const query = {_id : id}
    const updatedData = {
        comments:data.comments
    }

    Albums.findOneAndUpdate(query,updatedData,option,callback)
}