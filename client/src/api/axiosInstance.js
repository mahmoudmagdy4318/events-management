import axios from "axios";
import _ from "lodash";

const instance = axios.create({
  baseURL: "/",
});

instance.interceptors.response.use(
  ({ data }) => data,
  (error) => {
    if (_.get(error, "response.status") === 403) {
      console.log("i got an error her");
      window.location.href = "/login";
      return;
    }
    return Promise.reject(error);
  }
);

export default instance;
