<template>
  <div>
    <Progress :step="this.$store.state.regularStep" />
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
      if (this.$store.state.regularStep >= 2) {
        this.$store.commit('updateRegular', 0)
      } else {
        this.$store.commit('updateRegular', this.$store.state.regularStep + 1)
      }
    }
  },
  components: {
    Progress
  }
}
</script>
