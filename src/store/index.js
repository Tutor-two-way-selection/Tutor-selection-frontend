import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // student: {
    //   regularStep: 0,
    //   graduationStep: 0,
    //   regularProfile: {
    //     flag: false
    //   },
    //   regularChoice: {
    //     flag: false
    //   },
    //   graduationProfile: {
    //     flag: false
    //   },
    //   graduationChoice: {
    //     flag: false
    //   }
    // }
    student: JSON.parse(window.sessionStorage.getItem('student'))
  },
  mutations: {
    // GET_Student: (state, data) => {
    //   // 把用户名存起来
    //   state.student = data
    //   // console.log(data)
    //   // window.sessionStorage.setItem('student', JSON.stringify(data))
    //   // console.log(JSON.parse(window.sessionStorage.getItem('student')))
    // },
    UPDATE_Session: (state) => {
      window.sessionStorage.setItem('student', JSON.stringify(state.student))
    },
    LOGOUT: (state) => {
      // 登出的时候要清除用户名
      state.student = null
      window.sessionStorage.removeItem('student')
    },
    setStudent (state, arg) {
      state.student = arg
    }

  },
  actions: {},
  modules: {}
})
