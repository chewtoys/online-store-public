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
    editCategory(state, item) {
      var cat = state.categories.Data.filter(c => c.ID == item.ID)[0]
      state.categories.Data[state.categories.Data.indexOf(cat)] = item
    },
    deleteCategory(state, id) {
      var cat = state.categories.Data.filter(c => c.ID == id)[0]
      var idxToDel = state.categories.Data.indexOf(cat)
      state.categories.Data.splice(idxToDel, 1)
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
      } catch (err) {
        console.error(err)
      }
    },
    async update({ commit }, item) {
      try {
        let { data } = await this.$axios.post('categories/update', item)
        commit('editCategory', item)
      } catch (err) {
        console.error(err)
      }
    },
    async delete({ commit }, id) {
      try {
        await this.$axios.post('categories/delete?id=' + id)
        commit('deleteCategory', id)
      } catch (err) {
        console.error(err)
      }
    },
  },
}
export default categories
