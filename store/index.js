export const state = () => ({
  sidebar: false,
  counter: 0
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  inc(state){
    state.counter++
  }
}
