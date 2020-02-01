import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    regularStep: 0,
    graduationStep: 0
  },
  mutations: {
    updateRegular (state, arg) {
      state.regularStep = arg
    },
    updateGraduation (state, arg) {
      state.graduationStep = arg
    }
  },
  actions: {},
  modules: {}
})
