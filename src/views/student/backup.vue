<template>
  <div>
    <Progress :step="step" />
    <el-button
      style="margin-top: 12px;"
      @click="next"
    >下一步</el-button>
    <br>
    {{necList}}
    <hr>
    {{necFileList}}
    <router-view
      :type="'graduate'"
      :necList="necList"
    />
  </div>
</template>
<script>
import Progress from '../../components/Progress'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      necList: [{
        url: '/upload/1',
        type: 'graduate',
        name: 'profileTable',
        fileList: []
      }, {
        url: '/upload/2',
        type: 'graduate',
        name: 'choiceTable',
        fileList: []
      }]
    }
  },
  methods: {
    next () {
      if (this.$store.state.student.graduate.form.profileTable.flag) {
        let temp = this.$store.state.student
        temp.graduate.form.choiceTable.flag = true
        this.$store.commit('setStudent', temp)
      } else {
        let temp = this.$store.state.student
        temp.graduate.form.profileTable.flag = true
        this.$store.commit('setStudent', temp)
      }
    }
  },
  components: {
    Progress
  },
  computed: mapState({
    step (state) {
      // graduate
      if (state.student.graduate.form.profileTable.flag && state.student.graduate.form.choiceTable.flag) {
        return 1
      } else {
        return 0
      }
    },
    necFileList () {
      var result = {}
      for (let j = 0; j < this.necList.length; j++) {
        result[this.necList[j].name] = []
      }
      for (let j = 0; j < this.necList.length; j++) {
        for (let i = 0; i < this.necList[j].fileList.length; i++) {
          result[this.necList[j].name].push(this.necList[j].fileList[i].response.url)
        }
      }
      return result
    }
  }),
  watch: {
    necList: {
      handler: function (val, oldval) {
        console.log('necList changed')
        let tempStudent = this.$store.state.student
        for (let i = 0; i < this.necList.length; i++) {
          if (tempStudent[this.necList[i].type]) {
            if (this.necList[i].fileList.length > 0) {
              tempStudent[this.necList[i].type].form[this.necList[i].name].flag = true
            } else {
              tempStudent[this.necList[i].type].form[this.necList[i].name].flag = false
            }
          }
        }
        console.log(tempStudent)
        this.$store.commit('setStudent', tempStudent)
      },
      deep: true// 对象内部的属性监听，也叫深度监听
    }
  }
}
</script>
