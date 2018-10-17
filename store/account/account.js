import * as Cookies from "js-cookie";
const account = {
  namespaced: true,
  state: () => ({
    authenticated: false,
    username: ""
  }),
  mutations: {
    authenticate(state) {
      state.authenticated = true;
    }
  },
  actions: {
    async logIn({ commit }, email, password) {
      try {
        let { data } = await $axios.auth(email, password);
        if (data.access_token) {
          Cookies.set("access-token", data.access_token);
        }
        commit("authenticate");
      } catch (err) {
        console.log(err);
      }
    },
    test() {
      console.log("test");
    }
  }
};
export default account;
