import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import instance from "../../api/axiosInstance";

import { useState } from "react";
import Moment from "react-moment";
import WithAdminHeader from "../../HOCs/WithAdminHeader";

const Events = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    instance
      .get("/events/")
      .then((res) => {
        setData(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  const deleteEvent = (id) => {
    instance
      .post("/events/delete", { id: id })
      .then(() => {
        setData(data.filter((e) => e._id != id));
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="card-header">Events</div>
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
          {data.map((event, index) => (
            <tr key={index}>
              <th>{event._id}</th>
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
                <Link
                  type="button"
                  className="btn btn-warning"
                  to={`/events/update/${event._id}`}
                >
                  edit
                </Link>
              </td>
              <td>
                <a
                  type="button"
                  className="btn btn-danger"
                  href="#"
                  id="deleteBtn"
                  onClick={() => deleteEvent(event._id)}
                >
                  delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default WithAdminHeader(Events);
