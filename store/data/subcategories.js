const subcategories = {
  namespaced: true,
  state: () => ({
    subcategories: {},
    categoryID: null,
  }),
  mutations: {
    get(state, data) {
      state.subcategories = data
    },
    create(state, item) {
      state.subcategories.Data.push(item)
    },
    update(state, item) {
      var cat = state.subcategories.Data.filter(c => c.ID == item.ID)[0]
      state.subcategories.Data[state.subcategories.Data.indexOf(cat)] = item
    },
    delete(state, id) {
      var cat = state.subcategories.Data.filter(c => c.ID == id)[0]
      var idxToDel = state.subcategories.Data.indexOf(cat)
      state.subcategories.Data.splice(idxToDel, 1)
    },
  },
  actions: {
    async getAll({ commit }, filter) {
      try {
        let { data } = await this.$axios.get(
          `subcategories/getAll?search=${filter.search}&page=${
            filter.page
          }&pageSize=${filter.pageSize}&categoryID=${filter.category}`
        )
        commit('get', data)
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    async create({ commit }, item) {
      try {
        let { data } = await this.$axios.post('subcategories/create', item)
        commit('create', data)
      } catch (err) {
        throw err
      }
    },
    async update({ commit }, item) {
      try {
        let { data } = await this.$axios.post('subcategories/update', item)
        commit('update', data)
      } catch (err) {
        throw err
      }
    },
    async delete({ commit }, id) {
      try {
        await this.$axios.post('subcategories/delete?id=' + id)
        commit('delete', id)
      } catch (err) {
        throw err
      }
    },
  },
}
export default subcategories
