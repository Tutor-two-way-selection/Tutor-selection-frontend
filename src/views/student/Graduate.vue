<template>
  <div>
    <h2>本科导师选择</h2>
    <Progress :step="step" :titleList="['上传个人信息','选择导师']" />
    <!-- <el-button
      style="margin-top: 12px;"
      @click="next"
    >下一步</el-button>
    <br>
    {{tutorType}}
    <br>
    {{necList}}
    <hr>
    {{necFileList}}
    {{necFileList}}
    <hr>
    {{necInfo}} -->
    <router-view :type="tutorType" :necList="necList" :baseForm="baseForm" />
    <el-button type="" @click="submitNec">提交基本信息</el-button>
    {{baseForm}}
  </div>
</template>
<script>
import Progress from '../../components/Progress'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      tutorType: 'graduate',
      necList: [],
      baseForm: {
        contact: '789'
      }
    }
  },
  methods: {
    next () {
    },
    submitNec () {
      this.axios.post('/student/info', this.necInfo).then(res => {
        if (res.data.success) {
          console.log('提交成功')
          this.$store.commit('LoadStudent')
        } else {
          console.log('提交出现故障')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: {
    Progress
  },
  computed: mapState({
    step (state) {
      if (state.flag[this.tutorType]) {
        return 1
      } else {
        return 0
      }
    },
    necFileList () {
      // 测试用
      var result = {}
      for (let j = 0; j < this.necList.length; j++) {
        result[this.necList[j].name] = []
      }
      for (let j = 0; j < this.necList.length; j++) {
        for (let i = 0; i < this.necList[j].fileList.length; i++) {
          result[this.necList[j].name].push(this.necList[j].fileList[i].url)
        }
      }
      return result
    },
    necInfo () {
      var result = {}
      result.stuID = this.$store.state.student.stuId
      result.tutorType = this.tutorType
      result.tableList = []
      for (let j = 0; j < this.necList.length; j++) {
        result[this.necList[j].name] = {}
        result.tableList.push({
          name: this.necList[j].name,
          title: this.necList[j].title
        })
      }
      for (let j = 0; j < this.necList.length; j++) {
        result[this.necList[j].name].flag = false
        result[this.necList[j].name].fileList = []
        for (let i = 0; i < this.necList[j].fileList.length; i++) {
          result[this.necList[j].name].flag = true
          var file = {}
          file.url = this.necList[j].fileList[i].url
          file.name = this.necList[j].fileList[i].name
          file.status = this.necList[j].fileList[i].status
          file.size = this.necList[j].fileList[i].size
          result[this.necList[j].name].fileList.push(file)
        }
      }
      return result
    }
  }),
  created () {
    // for (let i = 0; i < this.necList.length; i++) {
    //   if (this.$store.state.student[this.tutorType].form[this.necList[i].name]) {
    //     this.necList[i].fileList = this.$store.state.student[this.tutorType].form[this.necList[i].name].fileList
    //     this.necList[i].title = this.$store.state.student[this.tutorType].form[this.necList[i].name].title
    //   }
    // }
    for (let key in this.$store.state.student[this.tutorType].form) {
      this.necList.push({
        url: '/uploadFile',
        name: key,
        title: this.$store.state.student[this.tutorType].form[key].title,
        fileList: this.$store.state.student[this.tutorType].form[key].fileList
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  h2 {
    margin-bottom: 40px;
  }
</style>
