const mongoose = require('mongoose');
const Topic = mongoose.Schema({
    topicName:{
        type: String
    },
    topicHeader:{
        type:String
    },
    content:{
        type:Object
    },
    creator:{
        type:String
    },
    comments:{  
        type:Array
    },
    placeId:{
        type:String
    },
    create_date:{
        type:Date,
        default: Date.now
    },
    topicPlace:{
        type:String
    }
});

const Topics = module.exports = mongoose.model('Topic',Topic)

module.exports.createTopic = (topics,callback) =>{
    Topics.create(topics,callback);
}
module.exports.getAllTopics = (callback,limit)=>{
    Topics.find(callback).sort({ create_date : -1}).select({ topicName: 1, topicPlace: 1,creator:1 }).limit(limit)
}

module.exports.getTopicComment = (callback,limit)=>{
    Topics.find(callback).sort({ create_date : -1}).select({topicName: 1,comments:1,creator:1  }).limit(limit)
}

module.exports.getTopicFromId = (id,callback,limit)=>{
    const query = {_id:id}
    Topics.find({_id:query},callback).limit(limit)
}

module.exports.getTopicFromUser = (name,callback,limit)=>{
    Topics.find({creator:name},callback).limit(limit)
}

module.exports.DeleteTopic = (id,callback)=>{
    const query = {_id:id}
    Topics.remove(query,callback)
}


module.exports.updateComments = (id,data,option,callback) =>{
    const query = {_id : id}
    const updatedData = {
        comments:data.comments
    }
    Topics.findOneAndUpdate(query,updatedData,option,callback)
}

module.exports.updateTopic= (id,data,option,callback) =>{
    const query = {_id : id}
    const updatedData = {
        placeId:data.placeId,
        content:data.content,
        topicName:data.topicName,
        topicPlace:data.topicPlace
    }

    Topics.findOneAndUpdate(query,updatedData,option,callback)
}