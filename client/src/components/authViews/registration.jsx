import React from "react";
import { PromiseProvider } from "mongoose";
import { useState } from "react";
import _ from "lodash";
import instance from "../../api/axiosInstance";

import { Redirect, useHistory, Link } from "react-router-dom";
import { useMemo } from "react";
import { useEffect } from "react";

function Register() {
  const [speaker, setSpeaker] = useState({});
  const [avatar, setAvatar] = useState({});
  const [error, setError] = useState("");
  const handleInput = (e) => {
    setSpeaker({ ...speaker, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setSpeaker({ image: "/images/man.jpg" });
  }, []);
  const history = useHistory();

  const handleImage = (e) => {
    setAvatar({ avatar: e.target.files[0] || "" });
  };

  const handleSubmitRegistration = (e) => {
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
      .post("/register", formData, config)
      .then((res) => history.push("/login"))
      .catch((err) =>
        setError(
          _.get(err, "response.data.error", "")
            .replace(/[}{]/, "")
            .replace("_", "")
        )
      );
  };
  return (
    <div className="container  mt-2 p-md-5">
      <Link className="btn btn-secondary btn-lg" to="/login">
        Back
      </Link>
      {error ? (
        <div className="alert alert-danger" role="alert">
          <strong>{error} is not valid</strong>
        </div>
      ) : (
        <></>
      )}
      <form onSubmit={handleSubmitRegistration}>
        <div className="form-row col-md-4">
          <label className=" h2" htmlFor="inputID">
            Id
          </label>
          <input
            type="number"
            className="form-control   "
            id="inputID"
            name="_id"
            required
            value={speaker._id}
            onChange={handleInput}
          />
        </div>
        <div className="form-row col-md-4">
          <label className=" h2" htmlFor="inputFullname">
            Fullname
          </label>
          <input
            type="text"
            className="form-control  "
            id="inputFullname"
            name="fullname"
            required
            pattern="([A-Za-z]+[ ]*)+"
            value={speaker.fullname}
            onChange={handleInput}
          />
        </div>
        <div className="form-row col-md-4">
          <label className=" h2" htmlFor="inputPassword4">
            Password
          </label>
          <input
            type="password"
            className="form-control  "
            id="inputPassword4"
            name="password"
            required
            value={speaker.password}
            onChange={handleInput}
          />
        </div>
        <div className="form-row col-md-4">
          <label className=" h2" htmlFor="inputUsername">
            Username
          </label>
          <input
            type="text"
            className="form-control  "
            id="inputUsername"
            name="username"
            required
            pattern="([A-Za-z]+[1-100]*)"
            value={speaker.username}
            onChange={handleInput}
          />
        </div>

        <div className="form-row">
          <div className="form-group col-md-3">
            <label className=" h2" htmlFor="inputCity">
              City
            </label>
            <input
              type="text"
              className="form-control   "
              id="inputCity"
              name="address.city"
              pattern="[A-Za-z]+"
              value={_.get(speaker, "address.city", "")}
              onChange={handleInput}
            />
          </div>

          <div className="form-group col-md-3">
            <label className=" h2" htmlFor="inputStreet">
              Street
            </label>
            <input
              type="number"
              className="form-control  "
              id="inputStreet"
              name="address.street"
              value={_.get(speaker, "address.street", "")}
              onChange={handleInput}
            />
          </div>
          <div className="form-group col-md-3">
            <label className="  h2" htmlFor="inputBuilding">
              Building
            </label>
            <input
              type="number"
              className="form-control  "
              id="inputBuilding"
              name="address.building"
              value={_.get(speaker, "address.building", "")}
              onChange={handleInput}
            />
          </div>
        </div>
        <label className=" mt-3 h3">Update you profile avatar</label>
        <div className="form-row">
          <input
            className="button btn-danger bg-danger"
            type="file"
            id="avatar"
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
        <button type="submit" className="btn btn-primary my-2" id="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
