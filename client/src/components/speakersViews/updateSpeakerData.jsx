import React from "react";
import { useEffect } from "react";
import instance from "../../api/axiosInstance";
import WithSpeakerHeader from "../../HOCs/WithSpeakerHeader";
import { useState } from "react";
import _ from "lodash";
import { useHistory } from "react-router-dom";

function UpdateMyData(props) {
  const [speaker, setSpeaker] = useState({});
  const [avatar, setAvatar] = useState({});
  const [error, setError] = useState("");
  const history = useHistory();
  useEffect(() => {
    instance
      .get(`/speakeraccess/edit/${props.name}`)
      .then((res) => {
        // debugger;
        console.log(res);
        setSpeaker({ ...res.data[0], password: "" });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInput = ({ target: { name, value } }) => {
    const editedSpeaker = _.set(_.cloneDeep(speaker), name, value);
    setSpeaker(editedSpeaker);
  };

  const handleImage = (e) => {
    setAvatar({ avatar: e.target.files[0] || "" });
  };

  const submitEdit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (avatar.avatar)
      formData.append("file", avatar.avatar, avatar.avatar.name);
    formData.append("body", JSON.stringify(speaker));

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    instance
      .post("/speakeraccess/edit", formData, config)
      .then((res) => history.push(`/speaker/profile/${props.name}`))
      .catch((err) => setError(_.get(err, "response.data.error", "")));
  };
  return (
    <div className="container  mt-2 p-md-5">
      {error ? (
        <div className="alert alert-danger" role="alert">
          <strong>{error}</strong>
        </div>
      ) : (
        <></>
      )}
      <form onSubmit={submitEdit} encType="multipart/form-data">
        <div className="form-row col-md-4">
          <label className=" h2" htmlFor="inputID">
            Id
          </label>
          <input
            type="text"
            className="form-control bg-transparent "
            id="inputID"
            name="_id"
            value={speaker._id}
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
            value={speaker.fullname}
            onChange={handleInput}
            required
            pattern="([A-Za-z]+[ ]*)+"
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
            onChange={handleInput}
            name="password"
            value={speaker.password}
            required
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
            value={speaker.username}
            onChange={handleInput}
            required
            pattern="[A-Za-z]+"
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
              value={_.get(speaker, "address.city", "")}
              onChange={handleInput}
              pattern="[A-Za-z]+"
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
              onChange={handleInput}
              value={_.get(speaker, "address.street", "")}
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
              onChange={handleInput}
              name="address.building"
              value={_.get(speaker, "address.building", "")}
            />
          </div>
        </div>
        <label className=" mt-3 h3">Update you profile avatar</label>
        <div className="form-row">
          <input
            className="button btn-danger bg-danger"
            type="file"
            id="avatar"
            // name="avatar"
            onChange={handleImage}
          />
        </div>
        <div className="text-warning mt-3 h2">OR</div>
        <label className=" mt-3 h3">Choose default profile icon</label>
        <div className="form-row " id="image-dropdown">
          <input
            type="radio"
            id="line1"
            name="image"
            value="/images/man.jpg"
            onChange={handleInput}
            checked="checked"
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
            onChange={handleInput}
            value="/images/man2.jpg"
          />
          <label htmlFor="line3" id="image3"></label>
          <input
            type="radio"
            id="line4"
            onChange={handleInput}
            name="image"
            value="/images/man3.jpg"
          />
          <label htmlFor="line4" id="image4"></label>
          <input
            type="radio"
            id="line5"
            name="image"
            onChange={handleInput}
            value="/images/woman2.jpg"
          />
          <label htmlFor="line5" id="image5"></label>
          <input
            type="radio"
            id="line6"
            name="image"
            onChange={handleInput}
            value="/images/man4.jpg"
          />
          <label htmlFor="line6" id="image6"></label>
        </div>

        <button type="submit" className="btn btn-primary align-content-center">
          Submit
        </button>
      </form>
    </div>
  );
}
export default WithSpeakerHeader(UpdateMyData);
