const categories = {
  namespaced: true,
  state: () => ({
    categories: {},
  }),
  mutations: {
    setCategories(state, data) {
      state.categories = data
    },
    addCategory(state, item) {
      state.categories.Data.push(item)
    },
  },
  actions: {
    async getCategories({ commit }) {
      try {
        let { data } = await this.$axios.get('categories/get')
        commit('setCategories', data)
        console.log(data)
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    async create({ commit }, item) {
      try {
        let { data } = await this.$axios.post('categories/create', item)
        commit('addCategory', {
          FileID: item.FileID,
          Color: item.Color,
          ID: item.ID,
          Title: item.Title,
        })
        debugger
      } catch (err) {
        console.log(err)
        debugger
      }
    },
  },
}
export default categories
