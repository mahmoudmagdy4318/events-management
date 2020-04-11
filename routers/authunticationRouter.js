const express = require("express");
const authRouter = express.Router();
const path = require("path");
const mongoose = require("mongoose");
require("../models/speakersModal");
const speakerSchema = mongoose.model("speakers");
const bcrypt = require("bcrypt");
const multer = require("multer");
const upload = multer({ dest: "public/images" });

authRouter.post("/login", (request, response) => {
  if (request.body.username == "mahmoud" && request.body.password == "123") {
    request.session.role = "admin";
    response.json({ login: "admin" });
  } else {
    speakerSchema
      .find({ username: request.body.username })
      .then(function (user) {
        return bcrypt.compare(request.body.password, user[0].password);
      })
      .then(function (samePassword) {
        if (!samePassword) {
          // request.flash("pass", "wrong password!");
          response.status(401).json({ message: "password incorrect" });
        } else {
          request.session.role = "speaker";
          request.session.name = request.body.username;
          response.json({ login: request.body.username });
        }
      })
      .catch(function (error) {
        console.log("login errror");
        response.status(401).json({ message: "user not found!" });
      });
  }
});

authRouter.post("/register", upload.single("file"), (request, response) => {
  debugger;
  request.body.body = JSON.parse(request.body.body);
  let newspeaker;
  if (request.file) {
    newspeaker = new speakerSchema({
      ...request.body.body,
      avatar: "/images/" + request.file.filename,
    });
  } else {
    newspeaker = new speakerSchema({
      ...request.body.body,
    });
  }
  newspeaker
    .save()
    .then((data) => {
      response.send("success");
    })
    .catch((error) => {
      response.status(401).json({
        error: ("" + error).split(":")[("" + error).split(":").length - 2],
      });
    });
});

authRouter.get("/logout", (request, response) => {
  request.session.destroy(() => {
    response.send("logout success");
  });
});
module.exports = authRouter;
