const mongoose = require('mongoose');

const Activity = mongoose.Schema({
    activityName:{
        type: String,
        unique: true
    },
    status:{
        type:Boolean,
        default:false
    },
    content:{
        type:String,
        default:null
    }
});

const Activities = module.exports = mongoose.model('Activity',Activity)

module.exports.addActivity = (tag,callback) =>{
    Activities.create(tag,callback);
}
//find all
module.exports.getAllActivity = (callback,limit)=>{
    Activities.find(callback).limit(limit)
}

//remove from Id
module.exports.removeActivity = (id,callback)=>{
    const query = {_id:id}
    Activities.remove(query,callback)
}

module.exports.updateActiveActivity = (newAct,oldAct,content,option,callback) =>{
    const updateOld = {
        status:false,
        content:null
    }
    const updateNew = {
        status:true,
        content:content
    }
    Activities.findOneAndUpdate({activityName:oldAct},updateOld,option,callback)

    Activities.findOneAndUpdate({activityName:newAct},updateNew,option,callback)

}