import React from "react";
import WithSpeakerHeader from "../../HOCs/WithSpeakerHeader";
import { useEffect } from "react";
import { useState } from "react";
import instance from "../../api/axiosInstance";
import { FormattedDate, FormattedTime } from "react-intl";
import Moment from "react-moment";
import _ from "lodash";
function SpeakerProfile(props) {
  const [events, setEvents] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    instance
      .get(`/speakeraccess/profile/${props.username}`)
      .then((res) => {
        setEvents(res.events);
        setData(...res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const apologize = (id, name, mainSpeakerId, title) => {
    instance
      .post("/speakeraccess/apologize", { id, name, mainSpeakerId, title })
      .then(() => {
        setEvents(events.filter((e) => e._id != id));
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {data.avatar ? (
        <img
          id="profileImage"
          style={{ width: "200", height: "200px" }}
          src={data.avatar}
        />
      ) : (
        <img
          id="profileIcon"
          style={{ width: "200", height: "200px" }}
          src={data.image}
        />
      )}
      <div className="card-header">Your Upcoming Events</div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Event date</th>
            <th scope="col">Main speaker</th>
            <th scope="col">Other speakers</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td>{event._id}</td>
              <td>{event.title}</td>
              <td>
                <Moment format="YYYY/MM/DD">{event.eventDate}</Moment>
              </td>
              {event.mainSpeaker ? (
                <td>{event.mainSpeaker.fullname}</td>
              ) : (
                <td className="text-danger">no speaker assigned</td>
              )}
              <td>
                {event.otherSpeakers ? (
                  <ul>
                    {event.otherSpeakers.map((speaker, i) => (
                      <li key={i}>{speaker.fullname}</li>
                    ))}
                  </ul>
                ) : (
                  <li>none</li>
                )}
              </td>

              <td>
                <a
                  type="button"
                  className="btn btn-danger"
                  href="#"
                  id="apologizeBtn"
                  onClick={() =>
                    apologize(
                      event._id,
                      props.username,
                      _.get(event, "mainSpeaker._id", ""),
                      event.title
                    )
                  }
                >
                  apologize
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

{
}

export default WithSpeakerHeader(SpeakerProfile);
