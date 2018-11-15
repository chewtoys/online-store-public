import * as Cookies from "js-cookie";
const account = {
  namespaced: true,
  state: () => ({
    authenticated: false,
    username: ""
  }),
  mutations: {
    authenticate(state, data) {
      state.authenticated = true;
      state.username = data.username;
    },
    logout(state) {
      state.authenticated = false;
      state.username = "";
    }
  },
  actions: {
    async logIn({ commit }, params) {
      try {
        let { data } = await this.$axios.auth(params.email, params.password);
        if (data.access_token) {
          Cookies.set("access-token", data.access_token);
        }
        if (data.refresh_token) {
          Cookies.set("refresh-token", data.refresh_token);
        }
        let userDataResponse = await this.$axios.post("account/tinyProfile");
        commit("authenticate", userDataResponse.data);
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async logOut({ commit }) {
      await this.$axios.post("account/logout");
      commit("logout");
    },
    test() {
      console.log("test");
    }
  }
};
export default account;
