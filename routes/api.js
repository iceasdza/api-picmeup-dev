const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const Places = require("../model/places");
const Events = require("../model/event");
const Topics = require('../model/topic')
const Register = require("../model/register");
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3')

//config digital ocean space service
const spacesEndpoint = new AWS.Endpoint('sgp1.digitaloceanspaces.com');
const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId:"WE2HA6GBKELTKFESAVGJ",
    secretAccessKey:"cHFN6MBCnpr3JHeQyBQ6Y/ItmPKYj1so8du6BQuhofs"

});

//upload config

//--------------------profile API sector-------------------------//
const uploadAvatar = multer({
  storage: multerS3({
    s3:s3,
    bucket:'picmeup/avatar',
    acl: 'public-read'
  })
})

router.post("/upLoadAvatar", uploadAvatar.single("img"), (req, res) => {
  res.send(req.file.location);
});
//


//--------------------upload places API sector-------------------------//
const uploadPlace = multer({
  storage: multerS3({
    s3:s3,
    bucket:'picmeup/places',
    acl: 'public-read'
  })
})

//----router----//0

//upload single file
router.post("/uploadSinglePlace", uploadPlace.single("img"), (req, res) => {
  res.send(req.file.location);
});
//upload multiple file
router.post("/uploadMultiplePlaces", uploadPlace.array("img", 12), (req, res) => {
  res.send(req.files);
});


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
  Places.getPlaceInfoFromID(id, (err, Places) => {
    if (err) {
      throw err;
    }
    res.json(Places);
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


//--------------------upload events API sector-------------------------//

const uploadEvent = multer({
  storage: multerS3({
    s3:s3,
    bucket:'picmeup/events',
    acl: 'public-read'
  })
})

//----router----//

//upload single file
router.post("/uploadSingleEvent", uploadEvent.single("img"), (req, res) => {
  res.send(req.file.location);
});
//upload multiple file
router.post("/uploadMultipleEvents", uploadEvent.array("img", 12), (req, res) => {
  res.send(req.files);
});


router.post("/addRegisterInfo", (req, res) => {
  const data = req.body;
  console.log(data)
  Register.register(data, (err, Register) => {
    if (err) {
      throw err;
    }
    res.send(Register);
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
  Events.getEventInfoFromId(id, (err, Events) => {
    if (err) {
      throw err;
    }
    res.json(Events);
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

router.post("/creatplace", (req, res) => {
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

// router.post("/addevent", (req, res) => {
//   console.log(req.body);
//   const events = req.body;
//   let ip = req.connection.remoteAddress.toString();
//   Object.assign(events, { IP: ip });
//   Events.addEvent(events, (err, Events) => {
//     if (err) {
//       throw err;
//     }
//     res.json(events);
//   });
// });



module.exports = router;
