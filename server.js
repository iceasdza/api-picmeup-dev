const express = require('express')
const cors = require('cors')
const multer  = require('multer')
const mongoose = require('mongoose')
const Places = require('./model/places')
const bodyParser = require('body-parser')
const fs = require('fs')

// used module
const app = express()
app.use(cors())
const db = mongoose.connect('mongodb://206.189.41.75:27017/finalproject')
app.use(bodyParser.json())
app.use(express.static('static'))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './static/images/places')
    }
    ,
    filename: (req, file, cb) => {
      cb(null,file.originalname)
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
            res.send("can")
        }
    })
 })



 app.post('/api/testData',(req,res) => {
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
app.delete('/api/deletePlaceDataFromId/:_id',(req,res)=>{
    const id = req.params._id
    Places.DeletePlaceFromId(id,(err)=>{
        if(err){
            throw err
        }
        res.send("ID : "+id+" removed!")
    })
})