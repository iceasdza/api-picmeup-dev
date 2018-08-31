const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const Places = require("../model/places");
const Events = require("../model/event");
const Register = require("../model/register");
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3')

//config digital ocean space service
const spacesEndpoint = new AWS.Endpoint('sgp1.digitaloceanspaces.com');
const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId:"CXOW6IA6AKFKO45QFS7T",
    secretAccessKey:"T7od5rXCS5r8ScZ+huHl4tmIans+xbfh4j4R0nXGB8c"

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
  console.log(req)
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

var today = new Date();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./static/images/places");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

//uload single file
router.post("/uploadSingleFile", upload.single("img"), (req, res) => {
  res.send(console.log("single upload says : ", req));
});
//upload multiple file
router.post("/uploadMultipleFile", upload.array("img", 12), (req, res) => {
  res.send(console.log("multiple upload says : ", req));
});

router.get("/deleteImage/:_id", (req, res) => {
  const id = req.params._id;
  res.send(console.log(id));
  fs.unlink("static/images/places/" + id, function(err) {
    if (err) {
      throw err;
    }
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

//get data from ID
router.get("/getPlaceInfoFromId/:_id", (req, res) => {
  const id = req.params._id;
  Places.getPlaceInfoFromID(id, (err, Places) => {
    if (err) {
      throw err;
    }
    res.json(Places);
  });
});

//delete data form ID
router.post("/deletePlaceDataFromId/:_id", (req, res) => {
  const filesName = req.body.FileName;
  console.log(filesName);
  filesName.map(data => {
    fs.unlink("static/images/places/" + data, function(err) {
      if (err) {
        throw err;
        res.send("can");
      }
    });
  });
  const id = req.params._id;
  Places.DeletePlaceFromId(id, err => {
    if (err) {
      throw err;
    }
    res.send("ID : " + id + " removed!");
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

//Event

const eventStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./static/images/events");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      today.getDay() +
        today.getMonth() +
        today.getFullYear() +
        today.getHours().toString() +
        "-" +
        file.originalname
    );
  }
});
const eventUpload = multer({ storage: eventStorage });

//upload single file
router.post("/uploadEventSingleFile", eventUpload.single("img"), (req, res) => {
  res.send(console.log("single upload says : ", req));
});
//upload multiple file
router.post(
  "/uploadEventMultipleFile",
  eventUpload.array("img", 12),
  (req, res) => {
    //  console.log(req.body)
    res.send(console.log("multiple upload says : ", req));
  }
);
//delete event file
router.get("/deleteEventImage/:_id", (req, res) => {
  const id = req.params._id;
  res.send(console.log(id));
  fs.unlink("static/images/events/" + id, function(err) {
    if (err) {
      throw err;
      res.send("can");
    }
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
  const filesName = req.body.FileName;
  console.log(filesName);
  filesName.map(data => {
    fs.unlink("static/images/events/" + data, function(err) {
      if (err) {
        throw err;
        res.send("can");
      }
    });
  });
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



module.exports = router;
