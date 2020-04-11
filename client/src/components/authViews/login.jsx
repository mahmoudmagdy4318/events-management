import React, { useEffect } from "react";
import instance from "../../api/axiosInstance";
import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import _ from "lodash";
function Login(props) {
  const [message, setMessage] = useState("");
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = (e) => {
    e.preventDefault();
    instance
      .post("login", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.login) {
          props.setLoginned(res.login);
          res.login == "admin"
            ? history.push("/admin/profile")
            : history.push(`/speaker/profile/${res.login}`);
        }
      })
      .catch((error) => {
        setMessage(
          _.get(error, "response.data.message", "Something went wrong!")
        );
      });
  };

  return (
    <div className="container-fluid">
      <div className="row no-gutter">
        <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
        <div className="col-md-8 col-lg-6">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-9 col-lg-8 mx-auto">
                  {message && (
                    <div className="alert alert-danger" role="alert">
                      <strong>{message}</strong>
                    </div>
                  )}
                  <h3 className="login-heading mb-4">Welcome back!</h3>
                  <form onSubmit={submitLogin}>
                    <div className="form-label-group">
                      <input
                        type="text"
                        id="inputEmail"
                        className="form-control"
                        placeholder="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                      <label htmlFor="inputEmail">username</label>
                    </div>

                    <div className="form-label-group">
                      <input
                        type="password"
                        id="inputPassword"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <label htmlFor="inputPassword">Password</label>
                    </div>
                    <button
                      className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                      type="submit"
                    >
                      Sign in
                    </button>
                  </form>
                  <a
                    className="btn btn-lg btn-outline-dark btn-block btn-login text-uppercase font-weight-bold mb-2"
                    type="submit"
                    href="/register"
                  >
                    Sign up
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
