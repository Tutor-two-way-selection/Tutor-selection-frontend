<template>
  <div>
    <el-form ref="student" :model="student" label-width="100px" label-position="left">
      <el-form-item label="姓名">
        <el-input :disabled="true" v-model="student.stuName"></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-input :disabled="true" v-model="student.classes"></el-input>
      </el-form-item>
      <el-form-item label="年级">
        <el-input :disabled="true" v-model="student.grade"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" required>
        <el-input v-model="student.contact"></el-input>
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
        classes: this.student.classes,
        grade: this.student.grade,
        contact: this.student.contact })
        .then(res => {
          if (res.data.success) {
            console.log('提交成功')
          } else {
            console.log('提交失败')
          }
        }).catch(err => {
          console.log(err)
        })
    },
    onReset () {
      this.student = JSON.parse(JSON.stringify(this.reset))
    }
  }
}
</script>
