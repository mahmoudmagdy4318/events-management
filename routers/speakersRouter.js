const express = require("express");
const speakersRouter = express.Router();
const path = require("path");
const mongoose = require("mongoose");
const Speaker = mongoose.model("speakers");

speakersRouter.use((request, response, next) => {
  debugger;
  if (request.session.role == "admin") {
    next();
  } else {
    response.status(403).send();
  }
});

speakersRouter.get(["/list", "/"], (request, response) => {
  Speaker.find({})
    .then((data) => {
      response.json({ speakers: data });
    })
    .catch((error) => {
      console.log(error);
    });
});
speakersRouter.get("/add", (request, response) => {
  response.render("speakersViews/addSpeakers.ejs", {
    message: request.flash(),
  });
});

speakersRouter.post("/add", (request, response) => {
  let newspeaker = new Speaker(request.body);
  newspeaker
    .save()
    .then((data) => {
      console.log("done");
      response.send("done");
    })
    .catch((error) => {
      response.status(401).json({
        error: ("" + error).split(":")[("" + error).split(":").length - 2],
      });
    });
});

speakersRouter.post("/edit", (request, response) => {
  let id = request.body._id;
  Speaker.update(
    { _id: id },
    {
      $set: request.body,
    }
  )
    .then((data) => {
      response.send("editted successfully");
    })
    .catch((error) => {
      console.log("" + error);

      response.status(401).json({ error: "username is not valid" });
    });
});

speakersRouter.get("/edit/:id", (request, response) => {
  Speaker.find({ _id: request.params.id })
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

speakersRouter.post("/delete", (request, response) => {
  Speaker.deleteOne({ _id: request.body._id })
    .then((data) => {
      console.log(request.body._id, "      here");
      response.send(data);
    })
    .catch((error) => {
      console.log(error + "");
    });
});

module.exports = speakersRouter;
