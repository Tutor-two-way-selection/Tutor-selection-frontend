<template>
  <div>
    <el-form ref="teacher" :model="teacher" label-width="100px" label-position="left">
      <el-form-item label="姓名" required>
        <el-input v-model="teacher.name"></el-input>
      </el-form-item>
      <el-form-item label="部门/研究所" required>
        <el-input v-model="teacher.department"></el-input>
      </el-form-item>
      <el-form-item label="研究方向" required>
        <el-input v-model="teacher.search"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" required>
        <el-input v-model="teacher.contact"></el-input>
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
      teacher: {},
      reset: {}
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.axios.post('/teacher/info', { teaID: this.$store.state.teacher.teaId })
        .then(res => {
          this.teacher = JSON.parse(JSON.stringify(res.data))
          this.reset = JSON.parse(JSON.stringify(res.data))
        })
    },
    onSubmit () {
      this.axios.post('/teacher/changeinfo', {
        teaID: this.$store.state.teacher.teaId,
        name: this.teacher.name,
        department: this.teacher.department,
        search: this.teacher.search,
        contact: this.teacher.contact })
        .then(res => {
          this.init()
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: '提交成功'
            })
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
    onReset () {
      this.teacher = JSON.parse(JSON.stringify(this.reset))
    }
  }
}
</script>
