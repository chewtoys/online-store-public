import Vuex from 'vuex'
import account from './account/account'
import categories from './data/categories'
import subcategories from './data/subcategories'
import snackbar from './snackbar'
import permissions from './account/permissions'
import navigation from './buyer/navigation'
const store = () =>
  new Vuex.Store({
    state: {
      sidebar: false,
      counter: 0,
    },
    mutations: {
      toggleSidebar(state) {
        state.sidebar = !state.sidebar
      },
      inc(state) {
        state.counter++
      },
    },
    modules: {
      account,
      snackbar,
      categories,
      subcategories,
      navigation,
      permissions,
    },
  })
export default store
