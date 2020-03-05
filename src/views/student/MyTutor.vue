<template>
  <div>
    <div class="Head" v-if="regularTutor">
      <h2>本科导师</h2>
      <hr>
    </div>
    <TutorInfo :tutor="regularTutor" />

    <div class="Head" v-if="graduateTutor">
      <h2>毕业设计导师</h2>
      <hr>
    </div>
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
      console.log('graduate!!!!!!!!!', res)
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
