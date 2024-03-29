const express = require("express");
const router = express.Router();
const multer = require("multer");
const Places = require("../model/places");
const Events = require("../model/event");
const Topics = require("../model/topic");
const Register = require("../model/register");
const Albums = require("../model/album");
const Tags = require('../model/tags')
const Activities = require('../model/activity')
const Inboxes = require('../model/inbox')
const AWS = require("aws-sdk");
var moment = require('moment-timezone');
const momentTz = require('moment-timezone')
const multerS3 = require("multer-s3");

//config digital ocean space service
const spacesEndpoint = new AWS.Endpoint("sgp1.digitaloceanspaces.com");
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: "WE2HA6GBKELTKFESAVGJ",
  secretAccessKey: "cHFN6MBCnpr3JHeQyBQ6Y/ItmPKYj1so8du6BQuhofs"
});

//upload config

//--------------------profile API sector-------------------------//
const uploadAvatar = multer({
  storage: multerS3({
    s3: s3,
    bucket: "picmeup/avatar",
    acl: "public-read"
  })
});

router.post("/upLoadAvatar", uploadAvatar.single("img"), (req, res) => {
  res.send(req.file.location);
});
//

//--------------------upload places API sector-------------------------//
const uploadPlace = multer({
  storage: multerS3({
    s3: s3,
    bucket: "picmeup/places",
    acl: "public-read"
  })
});

//----router----//0

//upload single file
router.post("/uploadSinglePlace", uploadPlace.single("img"), (req, res) => {
  res.send(req.file.location);
});
//upload multiple file
router.post(
  "/uploadMultiplePlaces",
  uploadPlace.array("img", 12),
  (req, res) => {
    res.send(req.files);
  }
);

//addplace
router.post("/addplace", (req, res) => {
  let ip = req.connection.remoteAddress.toString();
  const places = req.body;
  Object.assign(places, { IP: ip });
  Places.addPlace(places, (err, Places) => {
    if (err) {
      throw err;
    }
    res.json(places);
  });
});

//get place from ID
router.get("/getPlaceInfoFromId/:_id", (req, res) => {
  const id = req.params._id;
  Places.getPlaceInfoFromID(id, (err, data) => {
    if (err) {
      throw err;
    }
    let count = data[0].viewCount+1
    Places.countView(id,count,err=>{
      if(err){
        throw err
      }
    })
    res.json(data);
  });
});

router.get("/getDataForSearchPlace/:value", (req, res) => {
  const value = req.params.value;  
    Places.find({ placeName: new RegExp(value+'+') }, function (err, doc) {
    if(err) {
      console.log(err)
    }
    res.json(doc)
  });  
});

router.get("/getDataForSearchEvent/:value", (req, res) => {
  const value = req.params.value;  
  Events.find({ eventName: new RegExp(value+'+') }, function (err, doc) {
    if(err) {
      console.log(err)
    }
    res.json(doc)
  });  
});

router.get("/getTagForSearchPlace/:value", (req, res) => {
  const value = req.params.value;  
    Places.find({ tags: new RegExp(value+'+') }, function (err, doc) {
    if(err) {
      console.log(err)
    }
    res.json(doc)
  });  
});

router.get("/getTagForSearchEvent/:value", (req, res) => {
  const value = req.params.value;  
  Events.find({ tags: new RegExp(value+'+') }, function (err, doc) {
    if(err) {
      console.log(err)
    }
    res.json(doc)
  });  
});

router.get("/getDescriptionForSearchPlace/:value", (req, res) => {
  const value = req.params.value;  
    Places.find({ placeDes: new RegExp(value+'+') }, function (err, doc) {
    if(err) {
      console.log(err)
    }
    res.json(doc)
  });  
});

router.get("/getDescriptionForSearchEvent/:value", (req, res) => {
  const value = req.params.value;  
  Events.find({ eventDes: new RegExp(value+'+') }, function (err, doc) {
    if(err) {
      console.log(err)
    }
    res.json(doc)
  });  
});

//get place from ID
router.get("/getPlaceInfoFromName/:name", (req, res) => {
  const name = req.params.name;
  Places.getPlaceInfoFromName(name, (err, Places) => {
    if (err) {
      throw err;
    }
    res.send(Places[0].id);
  });
});
//delete place from id
router.post("/deletePlaceDataFromId/:_id", (req, res) => {
  const id = req.params._id;
  Places.DeletePlaceFromId(id, err => {
    if (err) {
      throw err;
    }
    res.send("ID : " + id + " removed!");
  });
});

router.put("/addPlaceComment/:_id", (req, res) => {
  const id = req.params._id;
  const data = req.body;
  console.log(data);
  Places.updateComments(id, data, err => {
    if (err) {
      throw err;
    }
    res.json(data);
  });
});

//--------------------upload events API sector-------------------------//

const uploadEvent = multer({
  storage: multerS3({
    s3: s3,
    bucket: "picmeup/events",
    acl: "public-read"
  })
});

//----router----//

//upload single file
router.post("/uploadSingleEvent", uploadEvent.single("img"), (req, res) => {
  res.send(req.file.location);
});
//upload multiple file
router.post(
  "/uploadMultipleEvents",
  uploadEvent.array("img", 12),
  (req, res) => {
    res.send(req.files);
  }
);

router.post("/addRegisterInfo", (req, res) => {
  const data = req.body;
  console.log(data);
  Register.register(data, (err, Register) => {
    if (err) {
      throw err;
    }
    res.send(Register);
  });
});

router.put("/updateProfile/:_user", (req, res) => {
  const user = req.params._user
  const data = req.body;
  console.dir(data)
  Register.updateProfile(user, data, err => {
    if (err) {
      throw err;
    }
    res.json(data);
  });
});

//getdata all
router.get("/GetPlaceInfo", (req, res) => {
  Places.getPlaceInfo((err, Places) => {
    if (err) {
      throw err;
    }
    res.json(Places);
  });
});

router.get("/getnewplace", (req, res) => {
  Places.getNewPlace((err, Places) => {
    if (err) {
      throw err;
    }
    res.json(Places);
  });
});

//update place from ID
router.put("/UpdatePlaceFromId/:_id", (req, res) => {
  const id = req.params._id;
  const data = req.body;
  let ip = req.connection.remoteAddress.toString();
  Object.assign(data, { IP: ip });
  Places.updatePlace(id, data, err => {
    if (err) {
      throw err;
    }
    res.json(data);
  });
});

//add event
router.post("/addevent", (req, res) => {
  console.log(req.body);
  const events = req.body;
  let ip = req.connection.remoteAddress.toString();
  Object.assign(events, { IP: ip });
  Events.addEvent(events, (err, Events) => {
    if (err) {
      throw err;
    }
    res.json(events);
  });
});
//get all event
router.get("/GetEventInfo", (req, res) => {
  Events.getEventInfo((err, Events) => {
    if (err) {
      throw err;
    }
    res.json(Events);
  });
});

router.get("/getnewevent", (req, res) => {
  Events.getNewEvent((err, Events) => {
    if (err) {
      throw err;
    }
    res.json(Events);
  });
});

//delete event from id
router.post("/deleteEventDataFromId/:_id", (req, res) => {
  const id = req.params._id;
  Events.DeleteEventFromId(id, err => {
    if (err) {
      throw err;
    }
    res.send("ID : " + id + " removed!");
  });
});

//edit event from id
router.put("/UpdateEventFromId/:_id", (req, res) => {
  const id = req.params._id;
  const data = req.body;
  let ip = req.connection.remoteAddress.toString();
  Object.assign(data, { IP: ip });
  Events.updateEvent(id, data, err => {
    if (err) {
      throw err;
    }
    res.json(data);
  });
});
router.put("/addEventComment/:_id", (req, res) => {
  const id = req.params._id;
  const data = req.body;
  console.log(data);
  // let ip = req.connection.remoteAddress.toString();
  // Object.assign(data, { IP: ip });
  Events.updateComments(id, data, err => {
    if (err) {
      throw err;
    }
    res.json(data);
  });
});

//======================================================================================================
const uploadAlbum = multer({
  storage: multerS3({
    s3: s3,
    bucket: "picmeup/album",
    acl: "public-read"
  })
});

//----router----//

//upload single file
router.post("/uploadSingleImage", uploadAlbum.single("img"), (req, res) => {
  res.send(req.file.location);
});
//upload multiple file
router.post(
  "/uploadMultipleImage",
  uploadAlbum.array("img", 12),
  (req, res) => {
    res.send(req.files);
  }
);

router.post("/addAlbum", (req, res) => {
  let ip = req.connection.remoteAddress.toString();
  const album = req.body;
  Object.assign(album, { IP: ip });
  Albums.addAlbum(album, (err, Albums) => {
    if (err) {
      throw err;
    }
    res.json(album);
  });
});

//getdata all
router.get("/getAlbums", (req, res) => {
  Albums.getAlbums((err, Albums) => {
    if (err) {
      throw err;
    }
    res.json(Albums);
  });
});

router.get("/getAlbumFromId/:_id", (req, res) => {
  const id = req.params._id;
  Albums.getAlbumsFromId(id, (err, Albums) => {
    if (err) {
      throw err;
    }
    res.json(Albums);
  });
});

router.put("/addAlbumComment/:_id", (req, res) => {
  const id = req.params._id;
  const data = req.body;
  // let ip = req.connection.remoteAddress.toString();
  // Object.assign(data, { IP: ip });
  Albums.updateComments(id, data, err => {
    if (err) {
      throw err;
    }
    res.json(data);
  });
});

// ===================================================================================================
router.get("/profile/:_userName", (req, res) => {
  const userName = req.params._userName;
  console.dir(userName)
  Register.getProfile(userName, (err, Register) => {
    if (err) {
      throw err;
    }
    res.json(Register);
  })
})
//check username
router.get("/findUserName/:name", (req, res) => {
  const _name = req.params.name;
  Register.checkUsername(_name, (err, Register) => {
    if (err) {
      throw err;
    }
    res.json(Register);
  });
});

router.get("/findEmail/:email", (req, res) => {
  const email = req.params.email;
  Register.checkEmail(email, (err, Register) => {
    if (err) {
      throw err;
    }
    res.json(Register);
  });
});

//get event from ID
router.get("/getEventInfoFromId/:_id", (req, res) => {
  const id = req.params._id;
  Events.getEventInfoFromId(id, (err, data) => {
    if (err) {
      throw err;
    }
    
    let count = data[0].viewCount+1
    Events.countView(id,count,err=>{
      if(err){
        throw err
      }
    })
    res.json(data);
  });
});

router.get("/getEventInfoFromName/:name", (req, res) => {
  const name = req.params.name;
  Events.getEventInfoFromName(name, (err, Events) => {
    if (err) {
      throw err;
    }
    res.send(Events[0].id);
  });
});

router.post("/login", (req, res) => {
  const data = req.body;
  Register.checkUser(data.userName, data.password, (err, Register) => {
    if (err) {
      throw err;
    }
    res.send(Register);
  });
});

// router.post("/upLoadAvatar", uploadAvatar.single("img"), (req, res) => {
//   res.send(console.log("single upload says : ", req));
// });

router.post("/createTopic", (req, res) => {
  let ip = req.connection.remoteAddress.toString();
  const topics = req.body;
  Object.assign(topics, { IP: ip });
  Topics.createTopic(topics, (err, topics) => {
    if (err) {
      throw err;
    }
    res.json(topics);
  });
});

router.get("/getalltopics", (req, res) => {
  Topics.getAllTopics((err, Topics) => {
    if (err) {
      throw err;
    }
    res.json(Topics);
  });
});

router.get("/getInteractTopic/:name", (req, res) => {
  const user = req.params.name;
  Topics.getTopicComment((err, Topics) => {
    if (err) {
      throw err;
    }
    const arr = []
    Topics.map(topic => {
      topic.comments.map(data => {
        if (data.commentator === user) {
          arr.push({ name: topic.topicName, id: topic._id,comment:data.comment,creator:topic.creator })
        }
      })
    })
    res.send(arr)
  });
});



router.get("/getTopicFromId/:_id", (req, res) => {
  const id = req.params._id;
  Topics.getTopicFromId(id, (err, Topics) => {
    if (err) {
      throw err;
    }
    res.json(Topics);
  });
});

router.put("/addTopicComment/:_id", (req, res) => {
  const id = req.params._id;
  const data = req.body;
  console.log(data);
  // let ip = req.connection.remoteAddress.toString();
  // Object.assign(data, { IP: ip });
  Topics.updateComments(id, data, err => {
    if (err) {
      throw err;
    }
    res.json(data);
  });
});

router.put("/updateTopic/:_id", (req, res) => {
  const id = req.params._id;
  const data = req.body;
  console.log(data);
  // let ip = req.connection.remoteAddress.toString();
  // Object.assign(data, { IP: ip });
  Topics.updateTopic(id, data, err => {
    if (err) {
      throw err;
    }
    res.json(data);
  });
});

router.put("/updateGeolocation", (req, res) => {
  const _name = req.body.user;
  const data = req.body;
  const date = moment().tz("Asia/Bangkok").format()
  // var getDate = new Date(moment.tz(new Date(), "Asia/Bangkok").format())
  console.dir(date)
  Register.updateGeoLocation(_name, data, date, err => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

router.put("/updateStatus", (req, res) => {
  const _name = req.body.user;
  const data = req.body;
  Register.updateStatus(_name, data, err => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

router.get("/getAllGeo/:_user", (req, res) => {
  const user = req.params._user;
  Register.getAllGeoLocation(user, (err, Register) => {
    if (err) {
      throw err;
    }
    res.json(Register);
  });
});

router.post("/addTag", (req, res) => {
  const tag = req.body;
  Tags.addTag(tag, (err, Tags) => {
    if (err) {
      throw err;
    }
    res.json(tag);
  });
});

router.get("/getAllTags", (req, res) => {
  Tags.getAllTags((err, Tags) => {
    if (err) {
      throw err;
    }
    res.json(Tags);
  });
});

router.put("/updateActiveTag", (req, res) => {
  const newTag = req.body.newTag;
  const oldTag = req.body.oldTag;
  Tags.updateActiveTag(newTag, oldTag, err => {
    if (err) {
      throw err;
    }
    res.json(Tags);
  });
});

router.get("/getPlaceFromTag/:tag", (req, res) => {
  const tag = req.params.tag;
  Places.getPlaceFromTag(tag, (err, Places) => {
    if (err) {
      throw err;
    }
    res.json(Places);
  });
});

router.post("/addActivity", (req, res) => {
  const activity = req.body;
  Activities.addActivity(activity, (err, Activities) => {
    if (err) {
      throw err;
    }
    res.json(activity);
  });
});

router.get("/getAllActivity", (req, res) => {
  Activities.getAllActivity((err, Activities) => {
    if (err) {
      throw err;
    }
    res.json(Activities);
  });
});

router.get("/getPlaceFromActivity/:activity", (req, res) => {
  const activity = req.params.activity;
  Places.getPlaceFromTag(activity, (err, Places) => {
    if (err) {
      throw err;
    }
    res.json(Places);
  });
});

router.put("/updateActivity", (req, res) => {
  const newTag = req.body.newTag;
  const oldTag = req.body.oldTag;
  const content  = req.body.content
  Activities.updateActiveActivity(newTag, oldTag,content, err => {
    if (err) {
      throw err;
    }
    res.json(Activities);
  });
});

router.post("/sendMessage", (req, res) => {
  const message = req.body;
  const date = moment().tz("Asia/Bangkok").format()
  Object.assign(message, { sendDate: date });
  Inboxes.sendMessage(message, (err, Inboxes) => {
    if (err) {
      throw err;
    }
    res.json(message);
  });
});

router.get("/getMessageFromName/:name", (req, res) => {
  const name = req.params.name;
  Inboxes.getMessageFromName(name, (err, Inboxes) => {
    if (err) {
      throw err;
    }
    res.json(Inboxes);
  });
});

router.get("/getAlbumFromId/:id", (req, res) => {
  const id = req.params.id;
  Albums.getAlbumsFromId(id, (err, Albums) => {
    if (err) {
      throw err;
    }
    res.json(Albums);
  });
});

router.get("/getAlbumFromName/:name", (req, res) => {
  const name = req.params.name;
  Albums.getAlbumsFromName(name, (err, Albums) => {
    if (err) {
      throw err;
    }
    res.json(Albums);
  });
});

router.put("/updateAlbum/:_id", (req, res) => {
  const id = req.params._id;
  const data = req.body;
  Albums.updateAlbum(id, data, err => {
    if (err) {
      throw err;
    }
    res.json(data);
  });
});

router.put("/changeMessageState/:_id", (req, res) => {
  const id = req.params._id;
  Inboxes.changeMessageState(id, err => {
    if (err) {
      throw err;
    }
  });
});


router.get("/getTopicFromName/:name", (req, res) => {
  const name = req.params.name;
  Topics.getTopicFromUser(name, (err, Topics) => {
    if (err) {
      throw err;
    }
    res.send(Topics);
  });
});

router.post("/deleteTopic/:_id", (req, res) => {
  const id = req.params._id;
  Topics.DeleteTopic(id, err => {
    if (err) {
      throw err;
    }
    res.send(Topics);
  });
});

router.post("/deleteAlbum/:_id", (req, res) => {
  const id = req.params._id;
  Albums.DeleteAlbum(id, err => {
    if (err) {
      throw err;
    }
    res.send(Albums);
  });
});

router.get("/getHotEvent", (req, res) => {
  Events.getHotEvent((err, Events) => {
    if (err) {
      throw err;
    }
    res.json(Events);
  });
});

router.get("/getHotPlace", (req, res) => {
  Places.getHotPlaces((err, Events) => {
    if (err) {
      throw err;
    }
    res.json(Events);
  });
});



module.exports = router;
