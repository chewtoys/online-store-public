import * as Cookies from "js-cookie";
const account = {
  namespaced: true,
  state: () => ({
    authenticated: false,
    username: "",
    roles: []
  }),
  getters: {
    isAdmin: state => {
      return (
        state.roles && state.roles.length && state.roles.indexOf("Admin") !== -1
      );
    }
  },
  mutations: {
    authenticate(state, data) {
      state.authenticated = true;
      state.roles = data.roles;
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
          Cookies.set("refresh-token", data.refresh_token);

          let userDataResponse = await this.$axios.post("account/tinyProfile");
          userDataResponse.data.username = data.username;
          commit("authenticate", userDataResponse.data);
        }
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async logOut({ commit }) {
      await this.$axios.post("account/logout");
      commit("logout");
    },
    async authByRefresh({ commit }) {
      var { data } = await this.$axios.authByToken();
      Cookies.set("access-token", data.access_token);
      Cookies.set("refresh-token", data.refresh_token);
      commit("authenticate", data);
    },
    test() {
      console.log("test");
    }
  }
};
export default account;
