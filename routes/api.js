const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const Places = require("../model/places");
const Events = require("../model/event");
const Register = require("../model/register")


const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./static/images/avatars");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const uploadAvatar = multer({ storage: avatarStorage });

router.post("/upLoadAvatar", uploadAvatar.single("img"), (req, res) => {
  res.send(console.log("single upload says : ", req));
});

router.post("/addRegisterInfo", (req, res) => {
  const data = req.body;
  Register.register(data, (err, Register) => {
    if (err) {
      throw err;
    }
    res.json(data);
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

module.exports = router;
