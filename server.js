const express = require('express')
const cors = require('cors')
const multer  = require('multer')

// used module
const app = express()
app.use(cors())

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './FileData')
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
     res.send(console.log(req))
 })