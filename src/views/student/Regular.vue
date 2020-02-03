<template>
  <div>
    <Progress :step="step" />
    <el-button
      style="margin-top: 12px;"
      @click="next"
    >下一步</el-button>
    <br>
    {{tutorType}}
    <br>
    {{necList}}
    <hr>
    {{necFileList}}
    <router-view
      :type="tutorType"
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
      tutorType: 'regular',
      necList: [{
        url: '/upload/1',
        name: 'profileTable',
        fileList: []
      }, {
        url: '/upload/2',
        name: 'choiceTable',
        fileList: []
      }, {
        url: '/upload/2',
        name: 'third',
        fileList: []
      }]
    }
  },
  methods: {
    next () {
    }
  },
  components: {
    Progress
  },
  computed: mapState({
    step (state) {
      if (state.student[this.tutorType].form.profileTable.flag && state.student[this.tutorType].form.choiceTable.flag) {
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
          if (tempStudent[this.tutorType]) {
            if (tempStudent[this.tutorType].form[this.necList[i].name]) {
              if (this.necList[i].fileList.length > 0) {
                tempStudent[this.tutorType].form[this.necList[i].name].flag = true
              } else {
                tempStudent[this.tutorType].form[this.necList[i].name].flag = false
              }
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
