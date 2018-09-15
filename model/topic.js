const mongoose = require('mongoose');
const Topic = mongoose.Schema({
    topicName:{
        type: String
    },
    content:{
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