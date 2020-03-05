<template>
  <div>
    <div class="Head">
      <h2 v-if="regularTutor&&(regularTutor.firstChoice||regularTutor.secondChoice)">本科导师</h2>
      <h2 v-else>暂无本科导师</h2>
      <hr>
    </div>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <TutorInfo :tutor="regularTutor.firstChoice" />
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <TutorInfo :tutor="regularTutor.secondChoice" />
      </el-col>
    </el-row>

    <div class="Head">
      <h2 v-if="graduateTutor&&(graduateTutor.firstChoice||graduateTutor.secondChoice)">毕业设计导师</h2>
      <h2 v-else>暂无毕业设计导师</h2>
      <hr>
    </div>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <TutorInfo :tutor="graduateTutor.firstChoice" />
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <TutorInfo :tutor="graduateTutor.secondChoice" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import TutorInfo from '../../components/stu/TutorInfo'
export default {
  data () {
    return {
      regularTutor: {},
      graduateTutor: {}
    }
  },
  components: {
    TutorInfo
  },
  created () {
    this.axios.post('/student/selected', {
      stuID: this.$store.state.student.stuId,
      type: 'regular'
    }).then(res => {
      this.regularTutor = res.data
    })
    this.axios.post('/student/selected', {
      stuID: this.$store.state.student.stuId,
      type: 'graduate'
    }).then(res => {
      this.graduateTutor = res.data
    })
  }
}
</script>
<style lang="scss" scoped>
</style>
