const express = require("express");
const eventsRouter = express.Router();
const mongoose = require("mongoose");
require("../models/eventsModal");
const eventsSchema = mongoose.model("events");
require("../models/speakersModal");
const speakerSchema = mongoose.model("speakers");

eventsRouter.use((request, response, next) => {
  if (request.session.role == "admin") {
    next();
  } else {
    response.status(403).send();
  }
});

eventsRouter.get(["/list", "/"], (request, response) => {
  console.log("hi events");

  eventsSchema
    .find({})
    .populate({ path: "mainSpeaker otherSpeakers" })
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      console.log(error + "");
    });
});

eventsRouter.get("/add", (request, response) => {
  speakerSchema
    .find({}, { _id: 1, fullname: 1 })
    .then((data) => {
      response.json({
        data: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

eventsRouter.post("/add", (request, response) => {
  debugger;
  let newEvent = new eventsSchema(request.body);
  newEvent
    .save()
    .then((data) => {
      response.send("added successfully");
    })
    .catch((error) => {
      try {
        request.flash(
          "registrationError",
          Object.keys(error.errors)[0] + " is invalid"
        );
        response.redirect("/events/add");
      } catch {
        // request.flash(
        //   "registrationError",
        //   Object.keys(error.keyPattern)[0] + " is already taken"
        // );
        response.status(401).send();
        // console.log("pattern is" + error.keyPattern);
      }
    });
});

eventsRouter.get("/update/:id", (request, response) => {
  eventsSchema
    .find({ _id: request.params.id })
    .populate({ path: "mainSpeaker otherSpeakers" })
    .then((eventData) => {
      let event = eventData[0];
      speakerSchema
        .find({}, { _id: 1, fullname: 1 })
        .then((data) => {
          response.json({ data: data, event: event });
          console.log(event.otherSpeakers);
        })
        .catch((error) => {
          console.log(error + " ");
        });
    })
    .catch((error) => {
      console.log(error + " ");
    });
});

eventsRouter.post("/update", (request, response) => {
  console.log(request.body);
  eventsSchema
    .update(
      { _id: request.body._id },
      {
        $set: request.body,
      }
    )
    .then((data) => {
      response.redirect("/events/");
    })
    .catch((error) => {
      try {
        request.flash(
          "registrationError",
          Object.keys(error.errors)[0] + " is invalid"
        );
        response.redirect("/events/update");
      } catch {
        request.flash(
          "registrationError",
          Object.keys(error.keyPattern)[0] + " is already taken"
        );
        response.redirect("/events/update");
        console.log("pattern is" + error.keyPattern);
      }
    });
});

eventsRouter.post("/delete", (request, response) => {
  eventsSchema
    .deleteOne({ _id: request.body.id })
    .then((data) => {
      response.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = eventsRouter;
