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
    <router-view :tutorType="tutorType" :initStep="initStep" :step="step" />

  </div>
</template>
<script>
import Progress from '../../components/Progress'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      tutorType: 'graduate',

      step: null
    }
  },
  methods: {

    initStep () {
      this.axios.post('/student/selected', {
        stuID: this.$store.state.student.stuId,
        type: this.tutorType
      }).then(res => {
        if (res.data.firstChoice) {
          this.step = 2
        } else if (this.$store.state.flag[this.tutorType]) {
          this.step = 1
        } else {
          this.step = 0
        }
      })
    }

  },
  components: {
    Progress
  },
  watch: {
    listenStep: {
      handler: function (val, oldval) {
        this.initStep()
      },
      deep: true// 对象内部的属性监听，也叫深度监听
    }
  },
  computed: mapState({
    listenStep () {
      return { stuID: this.$store.state.student.stuId,
        type: this.tutorType,
        tutorType: this.$store.state.flag[this.tutorType] }
    }

  }),
  created () {

  }
}
</script>
<style lang="scss" scoped>
  h2 {
    margin-bottom: 40px;
  }
</style>
