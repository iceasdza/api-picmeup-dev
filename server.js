const express = require('express')
const cors = require('cors')
const multer  = require('multer')
const mongoose = require('mongoose')
const Places = require('./model/places')
const bodyParser = require('body-parser')

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
    res.send(console.log("single upload says : ",req.file)) 
 })
 //upload multiple file 
 app.post('/api/uploadMultipleFile', upload.array('img', 12), (req,res)=>{
     res.send(console.log("multiple upload says : ",req.files))
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