import React from "react";
import { useEffect } from "react";
import instance from "../../api/axiosInstance";

import { useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import _ from "lodash";
import DatePicker from "react-date-picker";
import { useHistory, Link } from "react-router-dom";

const EditEvent = (props) => {
  const [data, setData] = useState([]);
  const [_id, setId] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [selectedMain, setSelectedMain] = useState([]);
  const [selectedOthers, setSelectedOthers] = useState([]);
  const [event, setEvent] = useState({});
  const [eventDate, setEventDate] = useState("");
  const history = useHistory();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!props.type) {
      instance.get(`/events/update/${props.id}`).then((res) => {
        let { data, event } = res;

        event.eventDate = new Date(Date.parse(event.eventDate));
        let array = data;
        setSelectedMain(
          array.filter(
            (s) => s.fullname === _.get(event, "mainSpeaker.fullname", "")
          )
        );
        setSelectedOthers(
          event.otherSpeakers.map((element) => {
            element["name"] = element["fullname"];
            delete element["fullname"];
            return element;
          })
        );
        array.forEach((element) => {
          element["name"] = element["fullname"];
          delete element["fullname"];
        });
        setId(event._id);
        setData(array);
        setEvent(event);
        setEventDate(event.eventDate);
        setEventTitle(event.title);
      });
    }
    //for the add component///////
    else {
      instance
        .get("/events/add")
        .then((res) => {
          const { data } = res;
          let array = data;
          array.forEach((element) => {
            element["name"] = element["fullname"];
            delete element["fullname"];
          });
          console.log(res);
          setData(array);
        })
        .catch((err) => console.log(err));
    }

    //////////////////////////
  }, []);

  const onIdChange = (e) => {
    if (props.type) {
      console.log(e);
      setId(e.target.value);
    }
  };
  const onDataChange = (date) => {
    setEventDate(date);
  };

  const onTitleChange = (e) => {
    setEventTitle(e.target.value);
  };

  const onMainSelect = (selectedList, selectedItem) => {
    setSelectedMain([selectedItem]);
  };

  const onOthersSelect = (selectedList, selectedItem) => {
    setSelectedOthers(selectedList);
  };

  const SubmitEditingEvent = (e) => {
    e.preventDefault();
    const eventData = {
      _id: _id,
      title: eventTitle,
      mainSpeaker: selectedMain[0]._id,
      otherSpeakers: selectedOthers.map((s) => s._id),
      eventDate: eventDate,
    };
    if (props.type === "add") {
      instance
        .post("/events/add", eventData)
        .then(() => {
          history.push("/events");
        })
        .catch((err) => setError("error"));
    } else {
      instance
        .post("/events/update", eventData)
        .then(() => {
          history.push("/events");
        })
        .catch((err) => setError("error"));
    }
  };

  return (
    <>
      <div className="container mt-5"></div>

      <div className="container">
        <Link className="btn btn-secondary btn-lg" to="/admin/profile">
          Back
        </Link>
        <form className="ui form" onSubmit={SubmitEditingEvent}>
          {error ? (
            <div className="alert alert-danger" role="alert">
              <strong>Invalid Id</strong>
            </div>
          ) : (
            <></>
          )}
          <div className="field">
            <label htmlFor="InputID">ID</label>
            <input
              type="number"
              id="InputID"
              aria-describedby="IDHelp"
              placeholder="Enter ID"
              name="_id"
              value={_id}
              onChange={onIdChange}
            />
            <small id="IDHelp" className="form-text text-muted">
              The ID of the event
            </small>
          </div>
          <div className="field">
            <label htmlFor="InputTitle">title</label>
            <input
              type="text"
              id="InputTitle"
              placeholder="Event title"
              name="title"
              value={eventTitle}
              onChange={onTitleChange}
              pattern="[A-Za-z]+"
            />
          </div>
          <div className="field">
            <label htmlFor="InputDate">Event date</label>
            <DatePicker value={eventDate} onChange={onDataChange} />
          </div>
          <div className="field" id="mainspeakerSelect">
            <label htmlFor="mainspeakerSelect">main speaker</label>
            <Multiselect
              options={data}
              displayValue="name"
              selectedValues={selectedMain}
              onSelect={onMainSelect}
            />
          </div>
          <div className="field" id="otherSpeakersSelect">
            <label htmlFor="otherSpeakersSelect">Other speakers</label>
            <Multiselect
              options={data}
              displayValue="name"
              selectedValues={selectedOthers}
              onSelect={onOthersSelect}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default EditEvent;
