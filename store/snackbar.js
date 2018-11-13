const snackbar = {
  namespaced: true,
  state: () => ({
    show: false,
    message: "",
    btnColor: "green",
    timeout: 3000,
    defaultMessage: "No data message supplied"
  }),
  mutations: {
    show(state, data) {
      state.message = data.message || state.defaultMessage;
      state.btnColor = data.btnColor || "green";
      state.timeout = data.timeout || 3000;
      state.show = true;
    },
    close(state) {
      state.show = false;
      state.message = state.defaultMessage;
    }
  }
};
export default snackbar;
