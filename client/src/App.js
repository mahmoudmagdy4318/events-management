import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import "./App.css";
import axios from "./api/axiosInstance";
import Header from "./components/header";
import Footer from "./components/footer";
import Login from "./components/authViews/login";
import AdminProfile from "./components/adminViews/adminProfile";
import Register from "./components/authViews/registration";
import Speakers from "./components/speakersViews/speakers";
import EditSpeaker from "./components/speakersViews/editSpeaker";
import AddSpeaker from "./components/speakersViews/addSpeakers";
import SpeakerProfile from "./components/speakersViews/speakerProfile";
import UpdateMyData from "./components/speakersViews/updateSpeakerData";
import EventsForSpeaker from "./components/speakersViews/eventsforSpeaker";
import Events from "./components/eventViews/events";
import EditEvent from "./components/eventViews/editEvents";

function App() {
  const [loginned, setLoginned] = useState(false);

  return (
    <Fragment>
      <BrowserRouter>
        <Route
          key="login"
          exact
          path="/login"
          render={() => <Login setLoginned={setLoginned} />}
        />
        <Route
          key="login2"
          exact
          path="/"
          render={() => <Login setLoginned={setLoginned} />}
        />
        <Route
          key="register"
          exact
          path="/register"
          render={() => <Register />}
        />

        <Route
          key="SpeakerProfile"
          exact
          path="/speaker/profile/:username"
          render={(routeprops) => (
            <SpeakerProfile username={routeprops.match.params.username} />
          )}
        />
        <Route
          key="Updatemydata"
          exact
          path="/speaker/update/:name"
          render={(routeprops) => (
            <UpdateMyData name={routeprops.match.params.name} />
          )}
        />
        <Route
          key="eventsforspeaker"
          exact
          path="/speaker/events"
          render={(routeprops) => <EventsForSpeaker username={loginned} />}
        />
        <Route
          key="adminProfile"
          exact
          path="/admin/profile"
          render={() => {
            if (loginned == "admin") return <AdminProfile />;
            else return <Redirect to="/login" />;
          }}
        />
        <Route
          key="speakers"
          exact
          path="/speakers"
          render={() => <Speakers />}
        />
        <Route
          key="Editspeaker"
          path="/speakers/edit/:id"
          render={(routeprops) => (
            <EditSpeaker id={routeprops.match.params.id} />
          )}
        />
        <Route
          key="addSpeaker"
          exact
          path="/speakers/add"
          render={(routeprops) => <AddSpeaker />}
        />
        <Route
          key="events"
          exact
          path="/events"
          render={(routeprops) => <Events />}
        />
        <Route
          key="editEvent"
          exact
          path="/events/update/:id"
          render={(routeprops) => <EditEvent id={routeprops.match.params.id} />}
        />
        <Route
          key="addEvent"
          exact
          path="/events/add"
          render={(routeprops) => <EditEvent type={"add"} />}
        />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
