import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'

import Student from '../views/Student.vue'
import Regular from '../views/student/Regular.vue'
import Graduate from '../views/student/Graduate.vue'
import SelectedTutor from '../views/student/SelectedTutor.vue'
import Publicly from '../views/student/Publicly.vue'
import MyTutor from '../views/student/MyTutor.vue'

import Teacher from '../views/Teacher.vue'
import TeachInfo from '../views/teacher/TeachInfo.vue'
import RegularTea from '../views/teacher/Regular.vue'
import GraduateTea from '../views/teacher/Graduate.vue'

import NecessaryInfo from '../components/NecessaryInfo.vue'
import ChooseTutor from '../components/ChooseTutor.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/student',
    name: 'student',
    component: Student,
    children: [{
      path: '/',
      redirect: 'selectedTutor'
    }, {
      path: 'regular',
      component: Regular,
      children: [{
        path: '/',
        redirect: 'necessaryInfo'
      }, {
        path: 'necessaryInfo',
        component: NecessaryInfo
      }, {
        path: 'chooseTutor',
        component: ChooseTutor
      }]
    },
    {
      path: 'graduate',
      component: Graduate,
      children: [{
        path: '/',
        redirect: 'necessaryInfo'
      }, {
        path: 'necessaryInfo',
        component: NecessaryInfo
      }, {
        path: 'chooseTutor',
        component: ChooseTutor
      }]
    }, {
      path: 'selectedTutor',
      component: SelectedTutor
    }, {
      path: 'publicly',
      component: Publicly
    }, {
      path: 'myTutor',
      component: MyTutor
    }
    ]
  },
  {
    path: '/teacher',
    name: 'teacher',
    component: Teacher,
    children: [{
      path: '/',
      redirect: 'teachInfo'
    }, {
      path: 'teachInfo',
      component: TeachInfo
    }, {
      path: 'regular',
      component: RegularTea
    }, {
      path: 'graduate',
      component: GraduateTea
    }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
