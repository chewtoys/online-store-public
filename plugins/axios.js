import axios from "axios";
import * as Cookies from "js-cookie";
import querystring from "querystring";
export default function({ $axios }) {
  var baseDomain = "http://localhost:7000";
  $axios.defaults.baseURL = `${baseDomain}/api`;
  let isRefreshing = false;
  let refreshSubscribers = [];
  $axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      const {
        config,
        response: { status }
      } = error;
      const originalRequest = config;
      if (status === 401) {
        if (!isRefreshing) {
          isRefreshing = true;
          $axios
            .post(
              `${baseDomain}/token`,
              querystring.stringify({
                grant_type: "refresh_token",
                refresh_token: Cookies.get("refresh-token")
              })
            )
            .then(response => {
              isRefreshing = false;
              Cookies.set("access-token", response.data.access_token);
              Cookies.set("refresh-token", response.data.refresh_token);
              onRefreshed(response.data.access_token);
            })
            .catch(err => {
              // TODO: не так убого
              // window.location = window.location.origin + "/auth";
            });
        }

        const retryOrigReq = new Promise((resolve, reject) => {
          subscribeTokenRefresh(token => {
            // из кук он сам не протянется, тк сохранено старое состояние запроса
            originalRequest.headers["Authorization"] = "Bearer " + token;
            resolve($axios(originalRequest));
          });
        });
        return retryOrigReq;
      } else if (status === 500) {
        const exception =
          error.response.data &&
          typeof error.response.data.IsError !== "undefined" &&
          error.response.data.Message
            ? error.response.data
            : error;
        return Promise.reject(exception);
      } else {
        return Promise.reject(error);
      }
    }
  );

  function subscribeTokenRefresh(cb) {
    refreshSubscribers.push(cb);
  }

  function onRefreshed(token) {
    refreshSubscribers.map(cb => cb(token));
  }

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
