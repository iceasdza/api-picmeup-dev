const express = require('express')
const cors = require('cors')
const multer  = require('multer')
const mongoose = require('mongoose')
const Places = require('./model/places')
const Events = require('./model/event')
const bodyParser = require('body-parser')
const fs = require('fs')

// used module
const app = express()
app.use(cors())
const db = mongoose.connect('mongodb://206.189.41.75:27017/finalproject')
app.use(bodyParser.json())
app.use(express.static('static'))
var today = new Date()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './static/images/places')
    }
    ,
    filename: (req, file, cb) => {
      cb(null,today.getDay()+today.getMonth()+today.getFullYear()+today.getHours().toString()+"-"+file.originalname)
    }
});
const upload = multer({storage: storage});

// route
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(3030, () => console.log('Example app listening on port 3030!'))

//uload single file
app.post('/api/uploadSingleFile', upload.single('img'), (req,res)=>{
    res.send(console.log("single upload says : ",req)) 
 })
 //upload multiple file 
 app.post('/api/uploadMultipleFile', upload.array('img', 12), (req,res)=>{
     res.send(console.log("multiple upload says : ",req))
 })

 app.get('/api/deleteImage/:_id',(req,res)=>{
    const id = req.params._id;
     res.send(console.log(id))
    fs.unlink("static/images/places/"+id,function (err){
        if(err){
            throw err
        }
    })
 })


//addplace
 app.post('/api/addplace',(req,res) => {
    console.log(req.body)
    const places = req.body
    Places.addPlace(places,(err,Places)=>{
        if(err){
            throw err
        }
        res.json(places)
    })
})

//getdata all
app.get('/api/GetPlaceInfo',(req,res)=>{
    Places.getPlaceInfo((err,Places)=>{
        if(err){
            throw err
        }
        res.json(Places)
    })
})

//get data from ID
app.get('/api/getPlaceInfoFromId/:_id',(req,res)=>{
    const id = req.params._id
    Places.getPlaceInfoFromID(id,(err,Places)=>{
        if(err){
            throw err
        }
        res.json(Places)
    })
})

//delete data form ID
app.post('/api/deletePlaceDataFromId/:_id',(req,res)=>{
    const filesName = req.body.FileName
    console.log(filesName)
    filesName.map(data=>{
        fs.unlink("static/images/places/"+data,function (err){
            if(err){
                throw err
                res.send("can")
            }
        })
    })
    const id = req.params._id
    Places.DeletePlaceFromId(id,(err)=>{
        if(err){
            throw err
        }
        res.send("ID : "+id+" removed!")
    })
})

//update place from ID
app.put('/api/UpdatePlaceFromId/:_id',(req,res)=>{
    const id = req.params._id;
    const data = req.body;
    Places.updatePlace(id,data,(err=>{
        if(err){
            throw err
        }
        res.json(data)
    }))
})




//Event

const eventStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './static/images/events')
    }
    ,
    filename: (req, file, cb) => {
      cb(null,today.getDay()+today.getMonth()+today.getFullYear()+today.getHours().toString()+"-"+file.originalname)
    }
});
const eventUpload = multer({storage: eventStorage});


//upload single file
app.post('/api/uploadEventSingleFile', eventUpload.single('img'), (req,res)=>{
    res.send(console.log("single upload says : ",req)) 
 })
 //upload multiple file 
 app.post('/api/uploadEventMultipleFile', eventUpload.array('img', 12), (req,res)=>{
     res.send(console.log("multiple upload says : ",req))
 })
//delete event file
 app.get('/api/deleteEventImage/:_id',(req,res)=>{
    const id = req.params._id;
     res.send(console.log(id))
    fs.unlink("static/images/events/"+id,function (err){
        if(err){
            throw err
            res.send("can")
        }
    })
 })

//add event
 app.post('/api/addevent',(req,res) => {
    console.log(req.body)
    const events = req.body
    Events.addEvent(events,(err,Events)=>{
        if(err){
            throw err
        }
        res.json(events)
    })
})
//get all event
app.get('/api/GetEventInfo',(req,res)=>{
    Events.getEventInfo((err,Events)=>{
        if(err){
            throw err
        }
        res.json(Events)
    })
})
//get event from ID
app.get('/api/getEventInfoFromId/:_id',(req,res)=>{
    const id = req.params._id
    Events.getEventInfoFromId(id,(err,Events)=>{
        if(err){
            throw err
        }
        res.json(Events)
    })
})

//delete event from id 
app.post('/api/deleteEventDataFromId/:_id',(req,res)=>{
    const filesName = req.body.FileName
    console.log(filesName)
    filesName.map(data=>{
        fs.unlink("static/images/events/"+data,function (err){
            if(err){
                throw err
                res.send("can")
            }
        })
    })
    const id = req.params._id
    Events.DeleteEventFromId(id,(err)=>{
        if(err){
            throw err
        }
        res.send("ID : "+id+" removed!")
    })
})

//edit event from id 
app.put('/api/UpdateEventFromId/:_id',(req,res)=>{
    const id = req.params._id;
    const data = req.body;
    Events.updateEvent(id,data,(err=>{
        if(err){
            throw err
        }
        res.json(data)
    }))
})
