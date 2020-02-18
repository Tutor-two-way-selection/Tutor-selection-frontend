<template>
  <div>
    TwoWaySelect
    <hr>
    {{progress}}
    <hr>
    {{tutorType}}
    <hr>
    {{stuList}}
    <!-- {{this.$route.params.tutorType}} -->
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      stuList: []
    }
  },
  computed: mapState({
    progress (state) {
      switch (this.$route.params.progress) {
        case 'first':
          return 1
        case 'second':
          return 2
        default:
          return this.$route.params.progress
      }
    },
    tutorType (state) {
      return this.type
    },
    stuListListener () {
      return { admNum: this.$store.state.admin.admId, type: this.tutorType, batch: this.progress }
    }
  }),
  watch: {
    stuListListener: {
      handler: function (val, oldval) {
        this.axios.post('/admin/situation', { admNum: this.$store.state.admin.admId, type: this.tutorType, batch: this.progress }).then(res => {
          this.stuList = res.data.stuList
        })
      },
      deep: true// 对象内部的属性监听，也叫深度监听
    }
  },
  props: ['type'],
  created () {
    this.axios.post('/admin/situation', { admNum: this.$store.state.admin.admId, type: this.tutorType, batch: this.progress }).then(res => {
      this.stuList = res.data.stuList
    })
  }
}
</script>
