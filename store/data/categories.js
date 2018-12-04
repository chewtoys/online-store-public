const categories = {
  namespaced: true,
  state: () => ({
    categories: []
  }),
  mutations: {
    setCategories(state, data) {
      state.categories = data;
    }
  },
  actions: {
    async getCategories({ commit }) {
      try {
        let { data } = await this.$axios.get("categories/get");
        commit("setCategories", data);
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async create({ commit }, item) {
      try {
        debugger;
        let { data } = await this.$axios.post("categories/create", item);
        console.log(data);
        debugger;
      } catch (err) {
        console.log(err);
        debugger;
      }
    }
  }
};
export default categories;
