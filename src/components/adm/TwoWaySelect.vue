<template>
  <div>
    TwoWaySelect
    <hr>
    {{progress}}
    <hr>
    {{tutorType}}
    <hr>
    <!-- {{this.$route.params.tutorType}} -->
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({
    progress (state) {
      return this.$route.params.progress
    },
    tutorType (state) {
      return this.type
    }
  }),
  props: ['type']
}
</script>
