const express = require("express");
const adminRouter = express.Router();
const path = require("path");
const mongoose = require("mongoose");
require("../models/speakersModal");
const speakerSchema = mongoose.model("speakers");
require("../models/notificationsModal");
const notification = mongoose.model("notifications");

adminRouter.use((request, response, next) => {
  if (request.session.role == "admin") {
    next();
  } else {
    response.status(403).send();
  }
});

adminRouter.get("/profile", (request, response) => {
  console.log("i'm inside admin profile");

  notification
    .find({})
    .then((data) => {
      response.json({ notifications: data });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = adminRouter;
