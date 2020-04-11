const express = require("express");
const speakersAccessRouter = express.Router();
const path = require("path");
const mongoose = require("mongoose");
const Speaker = mongoose.model("speakers");
require("../models/eventsModal");
const eventsSchema = mongoose.model("events");
require("../models/notificationsModal");
const notification = mongoose.model("notifications");
const bcrypt = require("bcrypt");
const multer = require("multer");
const upload = multer({ dest: "public/images" });

speakersAccessRouter.use((request, response, next) => {
  if (request.session.role == "speaker") {
    next();
  } else {
    response.status(403).send();
  }
});
speakersAccessRouter.get("/profile/:username", (request, response) => {
  let username = request.params.username;
  Speaker.find({ username: username })
    .then((data) => {
      let speakerId = data[0]._id;
      eventsSchema
        .find({
          $or: [
            { mainSpeaker: speakerId },
            { otherSpeakers: { $in: [speakerId] } },
          ],
        })
        .populate({ path: "mainSpeaker otherSpeakers" })
        .then((events) => {
          let name = request.session.name;
          response.json({
            events: events,
            data: data,
            name: name,
          });
        })
        .catch((error) => {
          console.log(error + "");
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

speakersAccessRouter.get("/events", (request, response) => {
  console.log("hi events");

  eventsSchema
    .find({})
    .populate({ path: "mainSpeaker otherSpeakers" })
    .then((data) => {
      let name = request.session.name;
      response.json({ data, data });
    })
    .catch((error) => {
      console.log(error + "");
    });
});

speakersAccessRouter.get("/edit/:name", (request, response) => {
  Speaker.find({ username: request.params.name })
    .then((data) => {
      console.log(data);
      response.json({
        data: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

speakersAccessRouter.post(
  "/edit",
  upload.single("file"),
  (request, response) => {
    debugger;
    request.body.body = JSON.parse(request.body.body);
    let username = request.body.body.username;
    if (request.file) {
      Speaker.updateOne(
        { _id: request.body.body._id },
        {
          $set: {
            ...request.body.body,
            avatar: "/images/" + request.file.filename,
          },
        }
      )
        .then((data) => {
          response.send("edit success");
        })
        .catch((error) => {
          console.log(error);

          response.status(401).json({
            error: "username is not valid",
          });
        });
    } else {
      console.log(request.body.body);

      Speaker.updateOne(
        { _id: request.body.body._id },
        {
          $set: request.body.body,
        }
      )
        .then((data) => {
          console.log("success");
          response.send("editing success");
        })
        .catch(function (error) {
          response.status(401).json({
            error: "username is not valid",
          });
        });
    }
  }
);

speakersAccessRouter.post("/apologize", (request, response) => {
  debugger;
  Speaker.find({ username: request.body.name })
    .then((speaker) => {
      if (speaker[0]._id == request.body.mainSpeakerId) {
        eventsSchema
          .updateOne(
            { _id: request.body.id, mainSpeaker: speaker[0]._id },
            { $set: { mainSpeaker: null } }
          )
          .then((data) => {
            let newNotificatione = new notification({
              body:
                "Mr. " +
                request.body.name +
                " apologized for " +
                request.body.title +
                " event",
              date: new Date(),
            });
            newNotificatione
              .save()
              .then((data2) => {
                response.send("success");
              })
              .catch((error) => {
                response.status(400).send();
              });
          })
          .catch((error) => {
            response.status(400).send();
          });
      } else {
        eventsSchema
          .updateOne(
            { _id: request.body.id },
            { $pull: { otherSpeakers: { $in: [speaker[0]._id] } } }
          )
          .then((data) => {
            let newNotificatione = new notification({
              body:
                "Mr. " +
                request.body.name +
                " apologized for " +
                request.body.title +
                " event",
              date: new Date(),
            });
            newNotificatione
              .save()
              .then((data2) => {
                response.send("success");
              })
              .catch((error) => {
                response.status(400).send();
              });
          })
          .catch((error) => {
            response.status(400).send();
          });
      }
    })
    .catch((error) => {
      response.status(400).send();
    });
});
module.exports = speakersAccessRouter;
