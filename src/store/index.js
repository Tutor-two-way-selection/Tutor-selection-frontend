import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    student: window.JSON.parse(window.sessionStorage.getItem('student')),
    flag: {
      regularFile: false,
      graduationFile: false
    },
    stuId: window.JSON.parse(window.sessionStorage.getItem('stuId'))
  },
  mutations: {
    UPDATE_Session: (state) => {
      console.log(state.student)
      console.log('UPDATE_Session', window.JSON.stringify(state.student), window.JSON.stringify(state.stuId))
      window.sessionStorage.setItem('student', window.JSON.stringify(state.student))
      window.sessionStorage.setItem('stuId', window.JSON.stringify(state.stuId))
    },
    LOGOUT: (state) => {
      // 登出的时候要清除用户名
      state.student = null
      state.flag.login = false
      window.sessionStorage.removeItem('student')
    },
    setStudent (state, arg) {
      state.student = arg
    },
    setStudentId (state, id) {
      if (state.student) {
        state.stuId = id
      } else {
        state.student = {}
        state.stuId = id
      }
      console.log(state.stuId)
    },
    LoadStudent (state, next) {
      axios.post('/student/information2').then(response => {
        // 不知道为什么,state.student[key] = response.data[key]会使watch监听失效
        // state.student = response.data
        Vue.set(state.student, 'tutorTypeList', response.data['tutorTypeList'])
        Vue.set(state.student, 'regular', response.data['regular'])
        Vue.set(state.student, 'graduation', response.data['graduation'])
        next()
      })
    },
    Flash_Flag (state) {
      if (state.student.tutorTypeList) {
        for (let i = 0; i < state.student.tutorTypeList.length; i++) {
          if (state.student[state.student.tutorTypeList[i]]) {
            let flag = true
            for (var key in state.student[state.student.tutorTypeList[i]].form) {
              if (state.student[state.student.tutorTypeList[i]].form[key].fileList.length > 0) {} else {
                flag = false
              }
            }
            state.flag[state.student.tutorTypeList[i]] = flag
          }
        }
      }
    }
  },
  actions: {},
  modules: {}
})
