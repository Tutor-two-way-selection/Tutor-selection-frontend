import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    student: window.JSON.parse(window.sessionStorage.getItem('student')) || {},
    flag: {
      regular: false,
      graduate: false
    }
  },
  mutations: {
    UPDATE_Session: state => {
      console.log(
        'UPDATE_Session',
        window.JSON.stringify(state.student)
      )
      window.sessionStorage.setItem(
        'student',
        window.JSON.stringify(state.student)
      )
    },
    LOGOUT: state => {
      // 登出的时候要清除用户名
      state.student = {}
      state.flag = {
        regular: false,
        graduate: false
      }
      // state.flag.login = false
      // window.sessionStorage.removeItem('student')
    },
    setStudent (state, arg) {
      state.student = arg
    },
    setStudentId (state, id) {
      Vue.set(state.student, 'stuId', id)
    },
    LoadStudent (state, args) {
      if (args.id || state.student.stuId) {
        console.log('LoadStudent')
        // axios
        //   .post('/student/information2', {
        //     id: state.stuId
        //   })
        //   .then(response => {
        //     // 不知道为什么,state.student[key] = response.data[key]会使watch监听失效
        //     // state.student = response.data
        //     Vue.set(
        //       state.student,
        //       'tutorTypeList',
        //       response.data['tutorTypeList']
        //     )
        //     Vue.set(state.student, 'regular', response.data['regular'])
        //     Vue.set(state.student, 'graduate', response.data['graduate'])
        //     next()
        //   })
        Vue.set(
          state.student,
          'tutorTypeList',
          ['regular', 'graduate']
        )
        axios.post('/student/queryinfo', {
          stuID: args.id || state.student.stuId,
          type: 'regular'
        }).then(res => {
          Vue.set(state.student, 'regular', {
            first: '',
            second: '',
            form: {
              profileTable: res.data.profileTable,
              choiceTable: res.data.choiceTable
            }
          })
        })
        axios.post('/student/queryinfo', {
          stuID: args.id || state.student.stuId,
          type: 'graduate'
        }).then(res => {
          Vue.set(state.student, 'graduate', {
            first: '',
            second: '',
            form: {
              profileTable: res.data.profileTable,
              choiceTable: res.data.choiceTable
            }
          })
        })
        args.next()
      } else {
        console.log('no stuId')
      }
    },
    Flash_Flag (state) {
      if (state.student && state.student.tutorTypeList) {
        for (let i = 0; i < state.student.tutorTypeList.length; i++) {
          if (state.student[state.student.tutorTypeList[i]]) {
            let flag = true
            for (var key in state.student[state.student.tutorTypeList[i]]
              .form) {
              if (
                state.student[state.student.tutorTypeList[i]].form[key].fileList
                  .length > 0
              ) {} else {
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
