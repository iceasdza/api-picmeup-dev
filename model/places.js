const mongoose = require('mongoose');

const Place = mongoose.Schema({
    placeName: {
        type: String
    },
    placeDes: {
        type: String
    },
    images: {
        type: Array
    },
    IP: {
        type: String
    },
    tel: {
        type: String
    },
    openTime: {
        type: String
    },
    closeTime: {
        type: String
    },
    comments: {
        type: Array
    },
    fee: {
        type: String
    },
    feePrice: {
        type: String
    },
    carParking: {
        type: String
    },
    carParkSize: {
        type: String
    },
    carParkPrice: {
        type: String
    },
    days: {
        type: Array
    },
    tags: {
        type: Array
    },
    activities: {
        type: Array
    },
    lat: {
        type: String
    },
    lng: {
        type: String
    },
    editor: {
        type: String
    },
    edit_date: {
        type: String
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    viewCount:{
        type:Number,
        default:0
    }
});

const Places = module.exports = mongoose.model('Place', Place)

module.exports.addPlace = (places, callback) => {
    Places.create(places, callback);
}
//find one
module.exports.getPlaceInfoFromID = (id, callback, limit) => {
    const query = { _id: id }
    Places.find({ _id: query }, callback).limit(limit)
}

//find by name
module.exports.getPlaceInfoFromName = (name, callback, limit) => {
    Places.find({ placeName: name }, callback).limit(limit)
}

module.exports.getPlaceFromTag = (activity, callback, limit) => {
    Places.find({ activities: activity }, callback).sort({ create_date: -1 }).limit(limit)
}
//find all
module.exports.getPlaceInfo = (callback, limit) => {
    Places.find(callback).sort({ create_date: -1 }).limit(limit)
}

//remove from Id
module.exports.DeletePlaceFromId = (id, callback) => {
    const query = { _id: id }
    Places.remove(query, callback)
}


//update place from Id
module.exports.updatePlace = (id, data, option, callback) => {
    const query = { _id: id }
    const updatedData = {
        placeName: data.placeName,
        placeDes: data.placeDes,
        tel: data.tel,
        openTime: data.openTime,
        closeTime: data.closeTime,
        fee: data.fee,
        carParking: data.carParking,
        FileList: data.FileList,
        days: data.days,
        tags: data.tags,
        editor: data.editor,
        edit_date: data.edit_date,
        images: data.images,
        activities: data.activities,
        lat: data.lat,
        lng: data.lng
    }

    Places.findOneAndUpdate(query, updatedData, option, callback)
}

module.exports.updateComments = (id, data, option, callback) => {
    const query = { _id: id }
    const updatedData = {
        comments: data.comments
    }

    Places.findOneAndUpdate(query, updatedData, option, callback)
}

module.exports.getHotPlaces = (callback)=>{
    Places.find(callback).sort({ viewCount : -1}).limit(3)
}

module.exports.getDataForSearch = (placeName, callback) => {
    return  Places.findOne({ placeName: new RegExp('^' + placeName + '$', "i") }, function (err, doc) {
            return doc
        });
}
module.exports.countView = (id,data,option,callback) =>{
    const query = {_id : id}
    const updatedData = {
        viewCount:data
    }
    Places.findOneAndUpdate(query,updatedData,option,callback)
}