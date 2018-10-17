import axios from "axios";
export default function({ $axios }) {
  var baseDomain = "http://localhost:7000";
  $axios.defaults.baseURL = `${baseDomain}/api`;
  $axios.auth = (login, password) => {
    return $axios.post(`${baseDomain}/token`, {
      grant_type: "password",
      username: login,
      password: password
    });
  };
}
