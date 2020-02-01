<template>
  <div>
    <Progress :step="this.$store.state.graduationStep" />
    <el-button
      style="margin-top: 12px;"
      @click="next"
    >下一步</el-button>
    <router-view />
  </div>
</template>
<script>
import Progress from '../../components/Progress'
export default {
  methods: {
    next () {
      if (this.$store.state.graduationStep >= 2) {
        this.$store.commit('updateGraduation', 0)
      } else {
        this.$store.commit('updateGraduation', this.$store.state.graduationStep + 1)
      }
    }
  },
  components: {
    Progress
  }
}
</script>
