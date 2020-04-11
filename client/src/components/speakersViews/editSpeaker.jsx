import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import instance from "../../api/axiosInstance";
import { useHistory, Link } from "react-router-dom";
import _ from "lodash";
function Editspeaker(props) {
  const [speakerData, setspeakerData] = useState({});
  const [error, setError] = useState("");
  const history = useHistory();

  useEffect(() => {
    instance
      .get(`/speakers/edit/${props.id}`)
      .then((res) => {
        setspeakerData(res[0]);
      })
      .catch((error) => console.log(error));
  }, []);
  const handleInput = ({ target: { name, value } }) => {
    const editedSpeaker = _.set(_.cloneDeep(speakerData), name, value);
    setspeakerData(editedSpeaker);
  };
  const onSubmitEditingspeaker = (e) => {
    e.preventDefault();
    instance
      .post("/speakers/edit", speakerData)
      .then(() => {
        history.push("/speakers");
      })
      .catch((err) => setError(_.get(err, "response.data.error", "")));
  };
  return (
    <div className="container">
      <div className="container bg-transparent mt-2 p-md-5">
        <Link className="btn btn-secondary btn-lg" to="/admin/profile">
          Back
        </Link>
        {error ? (
          <div className="alert alert-danger" role="alert">
            <strong>{error} is not valid</strong>
          </div>
        ) : (
          <></>
        )}
        <form onSubmit={onSubmitEditingspeaker}>
          <div className="form-row col-md-4">
            <label className=" h2" htmlFor="inputID">
              Id
            </label>
            <input
              type="text"
              className="form-control bg-transparent "
              id="inputID"
              name="_id"
              value={speakerData._id}
              readOnly
            />
          </div>
          <div className="form-row col-md-4">
            <label className=" h2" htmlFor="inputFullname">
              Fullname
            </label>
            <input
              type="text"
              className="form-control bg-transparent "
              id="inputFullname"
              name="fullname"
              value={speakerData.fullname}
              required
              pattern="([A-Za-z]+[ ]*)+"
              onChange={handleInput}
            />
          </div>
          <div className="form-row col-md-4">
            <label className=" h2" htmlFor="inputPassword4">
              Password
            </label>
            <input
              type="password"
              className="form-control bg-transparent "
              id="inputPassword4"
              name="password"
              value={speakerData.password}
              readOnly
            />
          </div>
          <div className="form-row col-md-4">
            <label className=" h2" htmlFor="inputUsername">
              Username
            </label>
            <input
              type="text"
              className="form-control bg-transparent "
              id="inputUsername"
              name="username"
              value={speakerData.username}
              readOnly
            />
          </div>

          <div className="form-row">
            <div className="form-group col-md-3">
              <label className=" h2" htmlFor="inputCity">
                City
              </label>
              <input
                type="text"
                className="form-control bg-transparent "
                id="inputCity"
                name="address.city"
                value={_.get(speakerData, "address.city", "")}
                pattern="[A-Za-z]+"
                onChange={handleInput}
              />
            </div>

            <div className="form-group col-md-3">
              <label className=" h2" htmlFor="inputStreet">
                Street
              </label>
              <input
                type="number"
                className="form-control bg-transparent "
                id="inputStreet"
                name="address.street"
                value={_.get(speakerData, "address.street", "")}
                onChange={handleInput}
              />
            </div>
            <div className="form-group col-md-3">
              <label className=" h2" htmlFor="inputBuilding">
                Building
              </label>
              <input
                type="number"
                className="form-control bg-transparent "
                id="inputBuilding"
                name="address.building"
                value={_.get(speakerData, "address.building", "")}
                onChange={handleInput}
              />
            </div>
          </div>

          <label className=" mt-3 h3">Choose default profile icon</label>
          <div className="form-row " id="image-dropdown">
            <input
              type="radio"
              id="line1"
              name="image"
              value="/images/man.jpg"
              checked="checked"
              onChange={handleInput}
            />
            <label htmlFor="line1" id="image1"></label>
            <input
              type="radio"
              id="line2"
              name="image"
              value="/images/woman.jpg"
              onChange={handleInput}
            />
            <label htmlFor="line2" id="image2"></label>
            <input
              type="radio"
              id="line3"
              name="image"
              value="/images/man2.jpg"
              onChange={handleInput}
            />
            <label htmlFor="line3" id="image3"></label>
            <input
              type="radio"
              id="line4"
              name="image"
              value="/images/man3.jpg"
              onChange={handleInput}
            />
            <label htmlFor="line4" id="image4"></label>
            <input
              type="radio"
              id="line5"
              name="image"
              value="/images/woman2.jpg"
              onChange={handleInput}
            />
            <label htmlFor="line5" id="image5"></label>
            <input
              type="radio"
              id="line6"
              name="image"
              value="/images/man4.jpg"
              onChange={handleInput}
            />
            <label htmlFor="line6" id="image6"></label>
          </div>

          <button
            type="submit"
            className="btn btn-primary align-content-center"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default Editspeaker;
