<template>
  <div>
    <!-- tutorType:{{tutorType}}
    <hr> -->
    <router-view :type="tutorType" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({
    tutorType (state) {
      return this.$route.params.tutorType
    }
  }),
  data () {
    return {
    }
  }
}
</script>
