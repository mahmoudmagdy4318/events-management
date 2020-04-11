const express = require("express");
const server = express();
const authRouter = require("./routers/authunticationRouter");
const speakersRouter = require("./routers/speakersRouter");
const speakersAccessRouter = require("./routers/speakerAccessRouter");
const eventsRouter = require("./routers/eventsRouter");
const adminRouter = require("./routers/adminRouter");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
var cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const cors = require("cors");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
server.use(cors());

mongoose
  .connect(process.env.MONGO_URL || "mongodb://localhost:27017/eventsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log("dataBase connected");
  })
  .catch((error) => {
    console.log(error);
  });

server.use(function (request, response, next) {
  console.log(
    "first Middleware " + request.url + " with method " + request.method
  );
  next();
});

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(cookieParser("secret"));

server.use(
  session({
    secret: "iti mansoura",
    cookie: { maxAge: 600000 },
  })
);

server.use(flash());

server.use((request, response, next) => {
  response.locals.success_messages = request.flash("success_messages");
  response.locals.error_messages = request.flash("error_messages");
  next();
});

if (process.env.NODE_ENV === "production") {
  server.use(express.static("client/build"));
  server.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "index.html"));
  });
}

server.use(express.static(path.join(__dirname, "public")));
server.use(express.static(path.join(__dirname, "images")));

server.use(
  express.static(path.join(__dirname, "node_modules", "bootstrap", "dist"))
);
server.use(express.static(path.join(__dirname, "node_modules", "jquery")));

server.use(authRouter);

// middlware for sessions

server.use((request, response, next) => {
  if (request.session.role) {
    next();
  } else {
    response.status(403).send();
  }
});

server.use("/speakers", speakersRouter);

server.use("/events", eventsRouter);

server.use("/admin", adminRouter);

server.use("/speakeraccess", speakersAccessRouter);

server.listen(process.env.NODE_ENV || 8000, () => {
  console.log("server is connected and listening on port number 8000");
});
