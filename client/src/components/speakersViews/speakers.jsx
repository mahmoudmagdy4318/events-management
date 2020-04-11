import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import instance from "../../api/axiosInstance";
import WithAdminHeader from "../../HOCs/WithAdminHeader";

function Speakers(props) {
  const [speakers, setSpeakers] = useState([]);
  useEffect(() => {
    instance
      .get("/speakers/")
      .then((res) => setSpeakers(res.speakers))
      .catch((error) => console.log(error));
  }, []);
  const handleDeleteSpeaker = (id) => {
    const index = speakers.indexOf(speakers.find((s) => s._id === id));
    instance.post("/speakers/delete", speakers[index]).then((res) => {
      setSpeakers(speakers.filter((s) => s._id !== id));
    });
  };

  return (
    <>
      <div className="card-header">Speakers</div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {speakers.map((speaker) => (
            <tr key={speaker._id}>
              <th>{speaker._id}</th>
              <td>{speaker.fullname}</td>
              <td>
                <Link
                  type="button"
                  className="btn btn-warning"
                  // onClick={() => props.onEditSpeaker(speaker._id)}
                  to={`/speakers/edit/${speaker._id}`}
                >
                  edit
                </Link>
              </td>
              <td>
                <a
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteSpeaker(speaker._id)}
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
}
export default WithAdminHeader(Speakers);
