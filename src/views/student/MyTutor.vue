<template>
  <div>
    <h2 v-if="regularTutor">本科导师</h2>
    <TutorInfo :tutor="regularTutor" />

    <h2 v-if="graduateTutor">毕业设计导师</h2>
    <TutorInfo :tutor="graduateTutor" />
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
    this.axios.post('/student/mytutor', {
      stuID: this.$store.state.student.stuId,
      type: 'regular'
    }).then(res => {
      this.regularTutor = res.data
    })
    this.axios.post('/student/mytutor', {
      stuID: this.$store.state.student.stuId,
      type: 'graduate'
    }).then(res => {
      this.graduateTutor = res.data
    })
  }
}
</script>
<style lang="scss" scoped>
  h2 {
    margin-bottom: 20px;
  }
</style>
