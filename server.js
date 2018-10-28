const express = require('express')
const cors = require('cors')
const multer  = require('multer')
const mongoose = require('mongoose')
const Places = require('./model/places')
const Events = require('./model/event')
const bodyParser = require('body-parser')
const fs = require('fs')

const api = require("./routes/api");

// used module
const app = express()
app.use(cors())
// const db = mongoose.connect('mongodb://206.189.41.75:27017/finalproject')
const db = mongoose.connect('mongodb://206.189.41.75:27017/finalproject')
// app.use(bodyParser.json())

app.use(bodyParser.json({limit: "100mb"}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit:50000}));

// route
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(3030, () => console.log('Example router listening on port 3030!'))

app.use("/api", api)