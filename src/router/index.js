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
import BaseInfo from '../views/student/BaseInfo.vue'

import Teacher from '../views/Teacher.vue'
import TeachInfo from '../views/teacher/TeachInfo.vue'
import RegularTea from '../views/teacher/Regular.vue'
import GraduateTea from '../views/teacher/Graduate.vue'
import PubliclyTea from '../views/teacher/Publicly.vue'
import Accepted from '../views/teacher/Accepted.vue'

import Admin from '../views/Admin.vue'
import StuDetail from '../views/admin/StuDetail.vue'
import TeaDetail from '../views/admin/TeaDetail.vue'
import Select from '../views/admin/Select.vue'
import GraduateAdm from '../views/admin/Graduate.vue'
import PubliclyAdm from '../views/admin/Publicly.vue'
import Confirm from '../views/admin/Confirm.vue'

import NecessaryInfo from '../components/stu/NecessaryInfo.vue'
import ChooseTutor from '../components/stu/ChooseTutor.vue'

import Situation from '../components/adm/Situation.vue'
import Manual from '../components/adm/Manual.vue'

Vue.use(VueRouter)

const routes = [{
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
  // name: 'student',
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
  }, {
    path: 'baseInfo',
    component: BaseInfo
  }
  ]
},
{
  path: '/teacher',
  // name: 'teacher',
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
  }, {
    path: 'publicly',
    component: PubliclyTea
  }, {
    path: 'accepted',
    component: Accepted
  }]
},
{
  path: '/admin',
  // name: 'admin',
  component: Admin,
  children: [{
    path: '/',
    redirect: 'stuDetail'
  }, {
    path: 'stuDetail',
    component: StuDetail
  }, {
    path: 'teaDetail',
    component: TeaDetail
  }, {
    path: '/admin/select/:tutorType',
    component: Select,
    children: [{
      path: '/',
      redirect: '/admin/select/regular/situation/first'
    }, {
      path: '/admin/select/:tutorType/situation/:progress',
      component: Situation
    }, {
      path: 'manual',
      component: Manual
    }]
  }, {
    // 弃用
    path: 'graduate',
    component: GraduateAdm,
    children: [{
      path: 'situation',
      component: Situation
    }]
  }, {
    path: 'publicly',
    component: PubliclyAdm
  }, {
    path: 'confirm',
    component: Confirm
  }]
}

]

const router = new VueRouter({
  routes
})

export default router
