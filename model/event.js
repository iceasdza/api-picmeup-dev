const mongoose = require('mongoose');

const Event = mongoose.Schema({
    eventName:{
        type: String
    },
    eventDes:{
        type:String
    },
    images:{
        type:Array
    },
    content:{
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
    feePrice:{
        type:String
    },
    days:{
        type:Array
    },
    tags:{
        type:Array
    },
    PlaceId:{
        type:String
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
    comments:{
        type:Array
    },
    edit_date:{       
        type:String
    },
    IP:{
        type:String
    },
    viewCount:{
        type:Number,
        default:0
    },
    create_date:{
        type:Date,
        default: Date.now
    }
});

const Events = module.exports = mongoose.model('Event',Event)

module.exports.addEvent = (events,callback) =>{
    Events.create(events,callback);
}

module.exports.getEventInfoFromId = (id,callback,limit)=>{
    const query = {_id:id}
   Events.find({_id:query},callback).limit(limit)
}

module.exports.getEventInfoFromName = (name,callback,limit)=>{
    Events.find({eventName:name},callback).limit(limit)
}

module.exports.getEventInfo = (callback,limit)=>{
    Events.find(callback).sort({ create_date : -1}).limit(limit)
}


module.exports.getNewEvent = (callback,limit)=>{
    Events.find(callback).sort({ create_date : -1}).limit(10)
}
module.exports.getHotEvent = (callback)=>{
    Events.find(callback).sort({ viewCount : -1}).limit(3)
}

module.exports.DeleteEventFromId = (id,callback)=>{
    const query = {_id:id}
    Events.remove(query,callback)
}

module.exports.updateEvent = (id,data,option,callback) =>{
    const query = {_id : id}
    const updatedData = {
        eventName : data.eventName,
        eventDes : data.eventDes,
        content : data.content,
        openTime : data.openTime,
        closeTime : data.closeTime,
        fee : data.fee,
        carParking : data.carParking,
        images : data.images,
        days : data.days,
        tags : data.tags,
        PlaceId:data.PlaceId,
        editor: data.editor,
        edit_date : data.edit_date
    }

    Events.findOneAndUpdate(query,updatedData,option,callback)
}

module.exports.updateComments = (id,data,option,callback) =>{
    const query = {_id : id}
    const updatedData = {
        comments:data.comments
    }

    Events.findOneAndUpdate(query,updatedData,option,callback)
}

module.exports.countView = (id,data,option,callback) =>{
    const query = {_id : id}
    const updatedData = {
        viewCount:data
    }
    Events.findOneAndUpdate(query,updatedData,option,callback)
}