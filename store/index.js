import Vuex from 'vuex'
import account from './account/account'
import categories from './data/categories'
import products from './data/products'
import subcategories from './data/subcategories'
import snackbar from './snackbar'
// import signalr from './signalr'
import permissions from './account/permissions'
import navigation from './buyer/navigation'
import menu from './menu'
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
    actions: {},
    modules: {
      account,
      // signalr,
      snackbar,
      menu,
      categories,
      subcategories,
      navigation,
      products,
      permissions,
    },
  })
export default store
