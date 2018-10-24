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
    }
});

const Topics = module.exports = mongoose.model('Topic',Topic)

module.exports.createTopic = (topics,callback) =>{
    Topics.create(topics,callback);
}
module.exports.getAllTopics = (callback,limit)=>{
    Topics.find(callback).limit(limit)
}

module.exports.getTopicFromId = (id,callback,limit)=>{
    const query = {_id:id}
    Topics.find({_id:query},callback).limit(limit)
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
        topicName:data.topicName
    }

    Topics.findOneAndUpdate(query,updatedData,option,callback)
}