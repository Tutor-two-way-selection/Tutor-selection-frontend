<template>
  <div>
    {{student}}
    <el-form ref="student" :model="student" label-width="100px" label-position="left">
      <el-form-item label="姓名">
        <el-input :disabled="true" v-model="student.stuName"></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-input :disabled="true" v-model="student.stuClass"></el-input>
      </el-form-item>
      <el-form-item label="年级">
        <el-input :disabled="true" v-model="student.stuGrade"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" required>
        <el-input v-model="student.stuTelephone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onReset">撤销修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      student: {},
      reset: {}
    }
  },
  created () {
    this.axios.post('/student/baseInfo', { stuID: this.$store.state.student.stuId })
      .then(res => {
        this.student = JSON.parse(JSON.stringify(res.data))
        this.reset = JSON.parse(JSON.stringify(res.data))
      })
  },
  methods: {
    onSubmit () {
      this.axios.post('/student/changeBaseInfo', {
        stuID: this.$store.state.student.stuId,
        stuName: this.student.stuName,
        classes: this.student.stuClass,
        grade: this.student.stuGrade,
        contact: this.student.stuTelephone })
        .then(res => {
          if (res.data.success) {
            this.$notify({
              title: '成功',
              message: '提交成功',
              type: 'success'
            })
          } else {
            this.$notify({
              title: '失败',
              message: '提交失败',
              type: 'error'
            })
          }
        }).catch(err => {
          this.$notify({
            title: '异常',
            message: err,
            type: 'warning'
          })
        })
    },
    onReset () {
      this.student = JSON.parse(JSON.stringify(this.reset))
    }
  }
}
</script>
