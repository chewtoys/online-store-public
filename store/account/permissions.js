const permissions = {
  namespaced: true,
  state: () => ({
    roles: [],
    rolePermissions: [],
    roleSpecials: [],
    permissionsActions: ['Create', 'Read', 'Update', 'Delete'],
  }),
  mutations: {
    update(state, data) {
      Object.assign(state, data)
    },
  },
  actions: {
    async getRoles({ commit }) {
      try {
        let { data } = await this.$axios.get('permissions/getRoles')
        if (data && data.length) {
          commit('update', { roles: data })
        }
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    async getRolePermissions({ commit }, roleID) {
      try {
        let { data } = await this.$axios.get(
          'permissions/getList?roleID=' + roleID
        )
        if (data) {
          commit('update', { rolePermissions: data })
        }
      } catch (err) {
        console.error(err)
      }
    },
    async getSpecialRolePermissions({ commit }, roleID) {
      try {
        let { data } = await this.$axios.get(
          'permissions/getSpecialList?roleID=' + roleID
        )
        if (data) {
          commit('update', { roleSpecials: data })
        }
      } catch (err) {
        console.error(err)
      }
    },
    async updatePermission({ commit }, payload) {
      try {
        await this.$axios.post('permissions/update', payload)
      } catch (err) {
        console.error(err)
      }
    },
    async updateSpecial({ commit }, payload) {
      try {
        await this.$axios.post('permissions/updateSpecial', payload)
      } catch (err) {
        console.error(err)
      }
    },
  },
}
export default permissions
