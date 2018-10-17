import Vuex from "vuex";
import account from "./account/account";
const store = () =>
  new Vuex.Store({
    state: {
      sidebar: false,
      counter: 0
    },
    mutations: {
      toggleSidebar(state) {
        state.sidebar = !state.sidebar;
      },
      inc(state) {
        state.counter++;
      }
    },
    modules: {
      account
    }
  });
export default store;
