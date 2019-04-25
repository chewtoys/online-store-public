const menu = {
  namespaced: true,
  state: () => ({
    items: [],
  }),
  mutations: {
    setItems(state, data) {
      state.items = data
    },
  },
  actions: {
    async getMenu({ commit }) {
      let { data } = await this.$axios.get(`home/getMenu`)
      commit('setItems', data)
    },
  },
}
export default menu
