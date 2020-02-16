<template>
  <div>
    Manual
    <hr>
    {{tutorType}}
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({
    tutorType (state) {
      return this.type
    }
  }),
  props: ['type']
}
</script>
