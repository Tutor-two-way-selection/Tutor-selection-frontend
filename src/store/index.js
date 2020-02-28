import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    student: window.JSON.parse(window.sessionStorage.getItem('student-tsf')) || {},
    teacher: window.JSON.parse(window.sessionStorage.getItem('teacher-tsf')) || {},
    admin: window.JSON.parse(window.sessionStorage.getItem('admin-tsf')) || {},
    accountType: window.JSON.parse(window.sessionStorage.getItem('accountType-tsf')) || '',
    flag: {
      regular: false,
      graduate: false
    }
  },
  mutations: {
    UPDATE_Session: state => {
      console.log(
        'UPDATE_Session'
      )
      window.sessionStorage.setItem('student-tsf', null)
      window.sessionStorage.setItem('teacher-tsf', null)
      window.sessionStorage.setItem('admin-tsf', null)
      if (state.accountType === 'student') {
        window.sessionStorage.setItem(
          'student-tsf',
          window.JSON.stringify(state.student)
        )
      } else if (state.accountType === 'teacher') {
        window.sessionStorage.setItem(
          'teacher-tsf',
          window.JSON.stringify(state.teacher)
        )
      } else if (state.accountType === 'admin') {
        window.sessionStorage.setItem(
          'admin-tsf',
          window.JSON.stringify(state.admin)
        )
      }
    },
    UPDATE_AccountType: state => {
      console.log(
        'UPDATE_Session'
      )
      window.sessionStorage.setItem(
        'accountType-tsf',
        window.JSON.stringify(state.accountType)
      )
      switch (state.accountType) {
        case 'student':
          state.teacher = {}
          state.admin = {}
          break
        case 'teacher':
          state.student = {}
          state.admin = {}
          break
        case 'admin':
          state.student = {}
          state.teacher = {}
          break
      }
    },
    LOGOUT: state => {
      // 登出的时候要清除用户名
      state.student = {}
      state.teacher = {}
      state.admin = {}
      state.accountType = ''
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
    setTeacherId (state, id) {
      Vue.set(state.teacher, 'teaId', id)
    },
    setAdminId (state, id) {
      Vue.set(state.admin, 'admId', id)
    },
    setAccountType (state, arg) {
      state.accountType = arg
    },
    LoadStudent (state, args) {
      if (!args) {
        args = {
          next: () => {},
          id: state.student.stuId
        }
      }
      if (!args.id) {
        args.id = state.student.stuId
      }
      if (args.id) {
        console.log('LoadStudent')
        Vue.set(
          state.student,
          'tutorTypeList',
          ['regular', 'graduate']
        )
        for (let i in state.student.tutorTypeList) {
          axios.post('/student/queryinfo', {
            stuID: args.id,
            type: state.student.tutorTypeList[i]
          }).then(res => {
            var tempForm = {}
            for (let index in res.data.tableList) {
              tempForm[res.data.tableList[index].name] = res.data[res.data.tableList[index].name]
              console.log(res.data.tableList[index].name, '!!!!!!!!!!!!!')
            }
            Vue.set(state.student, state.student.tutorTypeList[i], {
              first: '',
              second: '',
              form: tempForm
            })
          })
        }

        // axios.post('/student/queryinfo', {
        //   stuID: args.id,
        //   type: 'graduate'
        // }).then(res => {
        //   var tempForm = {}
        //   for (let index in res.data.tableList) {
        //     tempForm[res.data.tableList[index].name] = res.data[res.data.tableList[index].name]
        //     console.log(res.data.tableList[index].name, '!!!!!!!!!!!!!')
        //   }
        //   Vue.set(state.student, 'graduate', {
        //     first: '',
        //     second: '',
        //     form: tempForm
        //   })
        // })
        args.next()
      } else {
        console.log('no stuId')
      }
    },
    LoadAdmin (state, args) {
      // Vue.set(state.admin, 'currentBatch', {})
      // 会刷新的数据:currentBatch
      if (!args) {
        args = {
          next: () => {}
        }
      }
      if (!args.id) {
        args.id = state.admin.admId
      }
      if (args.grades) {
        Vue.set(
          state.admin,
          'grades',
          args.grades
        )
        Vue.set(
          state.admin,
          'currentGrade',
          args.grades[0]
        )
      }
      console.log('LoadAdmin')

      Vue.set(
        state.admin,
        'tutorTypeList',
        ['regular', 'graduate']
      )

      Vue.set(state.admin, 'currentBatch', {})
      for (let i in state.admin.tutorTypeList) {
        axios.post('/admin/querybatch', {
          grade: state.admin.currentGrade,
          type: state.admin.tutorTypeList[i]
        }).then(res => {
          Vue.set(state.admin.currentBatch, state.admin.tutorTypeList[i], res.data.batch)
          // 测试
          if (state.admin.currentGrade === '2016') {
            Vue.set(state.admin.currentBatch, state.admin.tutorTypeList[i], 2)
          }
        })
      }

      args.next()
    },
    FlashBatch (state) {
      Vue.set(state.admin, 'currentBatch', {})
      for (let i in state.admin.tutorTypeList) {
        axios.post('/admin/querybatch', {
          grade: state.admin.currentGrade,
          type: state.admin.tutorTypeList[i]
        }).then(res => {
          Vue.set(state.admin.currentBatch, state.admin.tutorTypeList[i], res.data.batch)
          // 测试
          if (state.admin.currentGrade === '2016') {
            Vue.set(state.admin.currentBatch, state.admin.tutorTypeList[i], 2)
          }
        })
      }
    },
    setCurrentGrade (state, currentGrade) {
      state.admin.currentGrade = currentGrade
    },
    Flash_Flag (state) {
      if (state.student && state.student.tutorTypeList) {
        for (let i = 0; i < state.student.tutorTypeList.length; i++) {
          if (state.student[state.student.tutorTypeList[i]]) {
            let flag = true
            for (var key in state.student[state.student.tutorTypeList[i]]
              .form) {
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
