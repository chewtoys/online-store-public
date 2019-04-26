const products = {
  namespaced: true,
  state: () => ({
    products: {},
    categoryID: null,
  }),
  mutations: {
    get(state, data) {
      state.products = data
    },
    create(state, item) {
      state.products.Data.push(item)
    },
    update(state, item) {
      var cat = state.products.Data.filter(c => c.ID == item.ID)[0]
      state.products.Data[state.products.Data.indexOf(cat)] = item
    },
    delete(state, id) {
      var cat = state.products.Data.filter(c => c.ID == id)[0]
      var idxToDel = state.products.Data.indexOf(cat)
      state.products.Data.splice(idxToDel, 1)
    },
  },
  actions: {
    async getAll({ commit }, filter) {
      try {
        let { data } = await this.$axios.get(
          `products/getAll?search=${filter.search}&page=${
            filter.page
          }&pageSize=${filter.pageSize}&subCategoryLink=${filter.link}`
        )
        commit('get', data)
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    async getByLink({ commit }, subCategoryID) {
      try {
        let { data } = await this.$axios.get(`products/get?id=${subCategoryID}`)
        this.commit('navigation/setState', { subCategory: data })
      } catch (er) {
        console.error(er)
      }
    },
    async create({ commit }, item) {
      try {
        let { data } = await this.$axios.post('products/create', item)
        commit('create', data)
      } catch (err) {
        throw err
      }
    },
    async update({ commit }, item) {
      try {
        let { data } = await this.$axios.post('products/update', item)
        commit('update', data)
      } catch (err) {
        throw err
      }
    },
    async delete({ commit }, id) {
      try {
        await this.$axios.post('products/delete?id=' + id)
        commit('delete', id)
      } catch (err) {
        throw err
      }
    },
  },
}
export default products
