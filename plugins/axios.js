import axios from "axios";
import * as Cookies from "js-cookie";
import querystring from "querystring";
export default function({ $axios }) {
  var baseDomain = "http://localhost:7000";
  $axios.defaults.baseURL = `${baseDomain}/api`;
  $axios.onRequest(config => {
    let token = Cookies.get("access-token") || "";
    if (token) config.headers.common["Authorization"] = "Bearer " + token;
  });
  $axios.auth = (login, password) => {
    return $axios.post(
      `${baseDomain}/token`,
      querystring.stringify({
        grant_type: "password",
        username: login,
        password: password
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
  };
}
