const mongoose = require('mongoose');

const Event = mongoose.Schema({
    eventName:{
        type: String
    },
    eventDes:{
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
    edit_date:{       
        type:String
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

module.exports.getEventInfo = (callback,limit)=>{
    Events.find(callback).limit(limit)
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
        tel : data.tel,
        openTime : data.openTime,
        closeTime : data.closeTime,
        fee : data.fee,
        carParking : data.carParking,
        FileList : data.FileList,
        days : data.days,
        tags : data.tags,
        PlaceId:data.PlaceId,
        editor: data.editor,
        edit_date : data.edit_date
    }

    Events.findOneAndUpdate(query,updatedData,option,callback)
}