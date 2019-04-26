const navigation = {
  namespaced: true,
  state: () => ({
    category: null,
    subCategory: null,
  }),
  mutations: {
    setState(state, data) {
      Object.assign(state, data)
    },
  },
}
export default navigation
