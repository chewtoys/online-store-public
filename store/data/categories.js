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
      console.log('before', cat)
      state.categories.Data[state.categories.Data.indexOf(cat)] = item
      console.log('after', item)
    },
    deleteCategory(state, id) {
      var cat = state.categories.Data.filter(c => c.ID == id)[0]
      var idxToDel = state.categories.Data.indexOf(cat)
      state.categories.Data.splice(idxToDel, 1)
    },
  },
  actions: {
    async getCategories({ commit }, filter) {
      try {
        filter = filter || {}
        let { data } = await this.$axios.get(
          `categories/getAll?search=${filter.search}&page=${
            filter.page
          }&pageSize=${filter.pageSize}`
        )
        commit('setCategories', data)
        console.log(data)
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    async getByLink({ commit }, link) {
      try {
        let { data } = await this.$axios.get(`categories/get?link=${link}`)
        this.commit('navigation/setState', { category: data })
      } catch (er) {
        console.error(er)
      }
    },
    async create({ commit }, item) {
      try {
        let { data } = await this.$axios.post('categories/create', item)
        commit('addCategory', data)
      } catch (err) {
        throw err
      }
    },
    async update({ commit }, item) {
      try {
        let { data } = await this.$axios.post('categories/update', item)
        commit('editCategory', data)
      } catch (err) {
        throw err
      }
    },
    async delete({ commit }, id) {
      try {
        await this.$axios.post('categories/delete?id=' + id)
        commit('deleteCategory', id)
      } catch (err) {
        throw err
      }
    },
  },
}
export default categories
