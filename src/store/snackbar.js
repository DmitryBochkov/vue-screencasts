export default {
  namespaced: true,
  state: {
    snackbars: []
  },
  getters: {
    snackbars: state => state.snackbars,
  },
  mutations: {
    SET_SNACKBAR(state, snackbar) {
      state.snackbars = state.snackbars.concat(snackbar)
    }
  },
  actions: {
    setSnackbar({commit}, snackbar) {
      snackbar.showing = true
      snackbar.color = snackbar.color || 'success'
      snackbar.timeout = snackbar.timeout || 4000
      commit('SET_SNACKBAR', snackbar)
    },

  },
}
