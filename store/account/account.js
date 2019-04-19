import * as Cookies from 'js-cookie'
const account = {
  namespaced: true,
  state: () => ({
    authenticated: false,
    username: '',
    roles: [],
    specialRoles: [],
    _definedRoles: ['Admin', 'Buyer', 'Editor'],
  }),
  getters: {
    isAdmin: state => {
      return (
        state.roles && state.roles.length && state.roles.indexOf('Admin') !== -1
      )
    },
    isInRole(state) {
      return role => state.roles.indexOf(role) !== -1
    },
  },
  mutations: {
    authenticate(state, data) {
      state.authenticated = true
    },
    setUserData(state, data) {
      state.username = data.userName
      var rolePrefix = 'r_'
      state._definedRoles.forEach(role => {
        let roleWithoutPrefix = role.replace(rolePrefix, '')

        if (Object.values(data.userRoles).indexOf(rolePrefix + role) !== -1)
          state.roles.push(roleWithoutPrefix)
      })
      // state.specialRoles = data
    },
    logout(state) {
      state.authenticated = false
      state.username = ''
      state.roles = []
    },
  },
  actions: {
    async logIn({ commit }, params) {
      try {
        let { data } = await this.$axios.auth(params.email, params.password)
        if (data.access_token) {
          Cookies.set('access-token', data.access_token)
          Cookies.set('refresh-token', data.refresh_token)
          commit('authenticate', data)
        }
        // TODO: the same in auto authoriz
        let userInfo = await this.$axios.get('account/getUserInfo')
        commit('setUserData', userInfo.data)
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    async logOut({ commit }) {
      await this.$axios.post('account/logOut')
      Cookies.remove('access-token')
      Cookies.remove('refresh-token')
      commit('logout')
    },
    async authByRefresh({ commit }) {
      try {
        var { data } = await this.$axios.authByToken()
        Cookies.set('access-token', data.access_token)
        Cookies.set('refresh-token', data.refresh_token)
        let userInfo = await this.$axios.get('account/getUserInfo')
        commit('authenticate', data)
        commit('setUserData', userInfo.data)
      } catch (error) {
        // ignore
      }
    },
    async register({ commit }, payload) {
      try {
        var { data } = await this.$axios.post('account/register', payload)
        this.commit('snackbar/show', {
          message: data,
          btnColor: 'green',
        })
      } catch (err) {
        this.commit('snackbar/show', {
          message: err.response.data.ExceptionMessage,
          btnColor: 'red',
        })
        throw err
      }
      await this.dispatch('account/logIn', {
        email: payload.Email,
        password: payload.Password,
      })
    },
  },
}
export default account
