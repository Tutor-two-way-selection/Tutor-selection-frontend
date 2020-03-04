<template>
  <div>
    <!-- TwoWaySelect
    <hr>
    {{progress}}
    <hr>
    {{tutorType}}
    <hr>
    {{stuList}}
    <hr> -->
    <!-- {{stuList}} -->
    <el-row type="flex" class="row-bg" justify="end">
      <el-button :type="accessToPublic?'primary':'info'" @click="toPublicly" :disabled="!accessToPublic" v-if="progress===3">进入公示阶段</el-button>
      <el-button :type="(!accessToPublic)?'success':'info'" @click="toManual" v-if="progress===3" :disabled="!(this.$store.state.admin.currentBatch[tutorType] === 3)">管理员分配</el-button>
      <el-button type="" @click="secondChoice" v-if="progress===1" :disabled="secondChoiceFlag">进入第二轮选择</el-button>
      <el-button type="" @click="manualChoice" v-if="progress===2" :disabled="manualChoiceFlag">进入管理员分配</el-button>
    </el-row>
    <el-table :data="stuList.filter(onSearch)" style="width: 100%">
      <el-table-column prop="" label="姓名" fixed>
        <template slot-scope="scope">
          <el-button :type="studentKey?'primary':'text'" size="mini" @click="searchStudent(scope.row.stuID)">{{scope.row.stuName}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="" label="班级">
        <template slot-scope="scope">
          <el-button :type="classesKey?'primary':'text'" size="mini" @click="searchClasses(scope.row.stuClass)">{{scope.row.stuClass}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="" label="导师姓名">
        <template slot-scope="scope">
          <el-button :type="teacherKey?'primary':'text'" size="mini" @click="searchTeacher(scope.row.teaID)">{{scope.row.name}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="" label="">
        <template slot="header" slot-scope="scope">
          <!-- <el-input v-model="searchKey" placeholder="输入关键字搜索" /> -->
          <el-input v-model="searchKey" placeholder="输入关键字搜索" :name="scope" size="mini"></el-input>
        </template>
        <template slot-scope="scope">
          <div @click="searchStatus(scope.row.status)">
            <el-button :plain="!statusKey" size="mini" type="info" v-if="scope.row.status==='untreat'">未处理</el-button>
            <el-button :plain="!statusKey" size="mini" type="success" v-if="scope.row.status==='accept'">接收</el-button>
            <el-button :plain="!statusKey" size="mini" type="danger" v-if="scope.row.status==='refuse'">不接收</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      stuList: [],
      searchKey: '',
      studentKey: '',
      classesKey: '',
      teacherKey: '',
      statusKey: ''
    }
  },
  methods: {
    toManual () {
      this.$router.push(`/admin/select/${this.tutorType}/manual`)
    },
    toPublicly () {
      this.axios.post('/admin/setbatch', {
        grade: this.$store.state.admin.currentGrade,
        type: this.tutorType,
        batch: 4
      }).then(res => {
        if (res.data.success) {
          this.$store.commit('FlashBatch')
          this.$router.push('/admin/publicly')
        }
      })
    },
    secondChoice () {
      this.axios.post('/admin/setbatch', { grade: this.$store.state.admin.currentGrade, type: this.tutorType, batch: 2 }).then(res => {
        if (res.data.success) {
          console.log('进入第二轮选择')
          this.$store.commit('FlashBatch')
          this.$router.push('/admin/select/' + this.tutorType + '/Situation/second')
        }
      })
    },
    manualChoice () {
      this.axios.post('/admin/setbatch', { grade: this.$store.state.admin.currentGrade, type: this.tutorType, batch: 3 }).then(res => {
        if (res.data.success) {
          console.log('进入管理员分配')
          this.$store.commit('FlashBatch')
          this.$router.push('/admin/select/' + this.tutorType + '/manual')
        }
      })
    },
    onSearch (data) {
      return (!this.searchKey ||
          data.stuName.toLowerCase().includes(this.searchKey.toLowerCase()) ||
          data.stuClass.toLowerCase().includes(this.searchKey.toLowerCase()) ||
          data.name.toLowerCase().includes(this.searchKey.toLowerCase())) &&
          (!this.teacherKey || data.teaID.toLowerCase().includes(this.teacherKey.toLowerCase())) &&
          (!this.statusKey || data.status.toLowerCase().includes(this.statusKey.toLowerCase())) &&
          (!this.studentKey || data.stuID.toLowerCase().includes(this.studentKey.toLowerCase())) &&
          (!this.classesKey || data.stuClass.toLowerCase().includes(this.classesKey.toLowerCase()))
    },
    searchStudent (student) {
      if (this.studentKey) {
        this.studentKey = ''
        this.flag = true
      } else {
        this.studentKey = student
        this.flag = false
      }
    },
    searchClasses (stuClass) {
      if (this.classesKey) {
        this.classesKey = ''
        this.flag = true
      } else {
        this.classesKey = stuClass
        this.flag = false
      }
    },
    searchTeacher (teacher) {
      if (this.teacherKey) {
        this.teacherKey = ''
        this.flag = true
      } else {
        this.teacherKey = teacher
        this.flag = false
      }
    },
    searchStatus (status) {
      if (this.statusKey) {
        this.statusKey = ''
        this.flag = true
      } else {
        this.statusKey = status
        this.flag = false
      }
    },
    init () {
      this.statusKey = ''
      this.flag = true
      this.$store.commit('LoadAdmin')
      this.axios.post('/admin/situation', { grade: this.$store.state.admin.currentGrade, type: this.tutorType, batch: this.progress }).then(res => {
        console.log(res)
        this.stuList = res.data.stuList || []
      })
    }
  },
  computed: mapState({
    progress (state) {
      switch (this.$route.params.progress) {
        case 'first':
          return 1
        case 'second':
          return 2
        case 'third':
          return 3
        case 'fourth':
          return 4
        default:
          return this.$route.params.progress
      }
    },
    tutorType (state) {
      return this.type
    },
    // 监听组件的初始条件的变化
    listener () {
      return { grade: this.$store.state.admin.currentGrade, type: this.tutorType, batch: this.progress }
    },
    secondChoiceFlag () {
      if (this.$store.state.admin.currentBatch[this.tutorType] === 1) {
        return false
      } else {
        return true
      }
    },
    manualChoiceFlag () {
      if (this.$store.state.admin.currentBatch[this.tutorType] === 2) {
        return false
      } else {
        return true
      }
    },
    accessToPublic () {
      for (let i in this.stuList) {
        if (!(this.stuList[i].status === 'accept')) {
          return false
        }
      }
      if (!(this.$store.state.admin.currentBatch[this.tutorType] === 3)) {
        return false
      }
      return true
    }
  }),
  watch: {
    listener: {
      handler: function (val, oldval) {
        this.init()
      },
      deep: true// 对象内部的属性监听，也叫深度监听
    }
  },
  props: ['type'],
  created () {
    this.init()
  }
}
</script>
