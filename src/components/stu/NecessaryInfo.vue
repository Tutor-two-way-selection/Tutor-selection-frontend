<template>

  <div class="necessary-info">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" v-for="(item, i) in necList" :key="i">
        <div class="head">
          <h3>{{ item.title || item.name }}</h3>
          <!-- <hr> -->
        </div>

        <el-upload class="upload-demo" :action="item.url" :on-preview="handlePreview" :on-remove="handleRemove[i]" :before-remove="beforeRemove" :on-success="handleSuccess[i]" :on-error="handleError" :before-upload="beforeUpload" :on-progress="handleProgress" multiple drag :auto-upload="true" :limit="3" :on-exceed="handleExceed" :file-list="item.fileList">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div slot="tip" class="el-upload__tip">文件总数不能超过3个</div>
        </el-upload>
      </el-col>
    </el-row>
    <el-button type="" @click="submitNec">提交基本信息</el-button>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      necList: [],
      handleSuccess: [],
      handleRemove: [],
      activeName: 'second'
    }
  },
  computed: mapState({
    necInfo () {
      var result = {}
      result.stuID = this.$store.state.student.stuId
      result.tutorType = this.tutorType
      result.tableList = []
      for (let j = 0; j < this.necList.length; j++) {
        result[this.necList[j].name] = {}
        result.tableList.push({
          name: this.necList[j].name,
          title: this.necList[j].title
        })
      }
      for (let j = 0; j < this.necList.length; j++) {
        result[this.necList[j].name].flag = false
        result[this.necList[j].name].fileList = []
        if (this.necList[j].fileList) {
          for (let i = 0; i < this.necList[j].fileList.length; i++) {
            result[this.necList[j].name].flag = true
            var file = {}
            file.url = this.necList[j].fileList[i].url
            file.name = this.necList[j].fileList[i].name
            file.status = this.necList[j].fileList[i].status
            file.size = this.necList[j].fileList[i].size
            result[this.necList[j].name].fileList.push(file)
          }
        }
      }
      return result
    }
  }),
  watch: {
    tutorType: {
      handler: function (val, oldval) {
        this.init()
      },
      deep: true// 对象内部的属性监听，也叫深度监听
    }
  },
  props: ['tutorType', 'baseForm', 'initStep'],
  methods: {
    init () {
      for (let key in this.$store.state.student[this.tutorType].form) {
        this.necList.push({
          url: 'http://localhost:3000/uploadFile',
          name: key,
          title: this.$store.state.student[this.tutorType].form[key].title,
          fileList: this.$store.state.student[this.tutorType].form[key].fileList
        })
      }

      for (let i = 0; i < this.necList.length; i++) {
        this.handleSuccess.push((response, file, fileList) => {
          console.log('success')
          console.log(file)
          var tempList = fileList
          file['url'] = window.location.protocol + '//' + window.location.host + '/downloadFile?filename=' + response.file.newfilename + '&oldname=' + response.file.originalname
          this.necList[i].fileList = tempList
          console.log(this.necList)
        })
      }
      for (let i = 0; i < this.necList.length; i++) {
        this.handleRemove.push((file, fileList) => {
          console.log('remove')
          this.necList[i].fileList = fileList
        })
      }

      this.initStep()
    },
    submitNec () {
      console.log(this.necInfo)
      this.axios.post('/student/info', this.necInfo).then(res => {
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '提交成功'
          })
          this.$store.commit('LoadStudent')
          this.initStep()
        } else {
          this.$message({
            type: 'error',
            message: '提交失败:' + res.data.err
          })
        }
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    },
    handleTabClick () { },
    handlePreview (file) {
      console.log(file)
    },
    // handleRemove (file, fileList) {
    //   console.log(file, fileLists)
    // },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleError () {
      this.$message({
        type: 'error',
        message: '上传时出现错误'
      })
      alert('error')
    },
    handleProgress (event, file, fileList) {
      this.$message({
        type: 'info',
        message: '开始上传'
      })
      console.log(file)
    },
    beforeUpload (file) {
      // alert('before upload')
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    }
  },
  created () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
  .necessary-info {
    text-align: left;
  }
</style>
