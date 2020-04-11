import React, { useEffect } from "react";
import WithSpeakerHeader from "../../HOCs/WithSpeakerHeader";
import instance from "../../api/axiosInstance";
import { useState } from "react";
import Moment from "react-moment";

function EventsForSpeaker(props) {
  console.log(props);

  const [data, setData] = useState([]);
  useEffect(() => {
    instance
      .get("/speakeraccess/events")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
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
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default WithSpeakerHeader(EventsForSpeaker);
