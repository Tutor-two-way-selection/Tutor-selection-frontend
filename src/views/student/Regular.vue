<template>
  <div>
    <h2>本科导师选择</h2>
    <Progress :step="step" />
    <!-- <el-button
      style="margin-top: 12px;"
      @click="next"
    >下一步</el-button>
    <br>
    {{tutorType}}
    <br>
    {{necList}}
    <hr>
    {{necFileList}} -->
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
        title: '学生个人简介表',
        fileList: []
      }, {
        url: '/upload/2',
        name: 'choiceTable',
        title: '导师双向选择表',
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
      if (state.flag[this.tutorType]) {
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
          result[this.necList[j].name].push(this.necList[j].fileList[i].url)
        }
      }
      return result
    }
  }),
  created () {
    for (let i = 0; i < this.necList.length; i++) {
      if (this.$store.state.student[this.tutorType].form[this.necList[i].name]) {
        this.necList[i].fileList = this.$store.state.student[this.tutorType].form[this.necList[i].name].fileList
      }
    }
  }
}
</script>
