<template>
  <div>
    <div>
      <el-row type="flex">
        <el-col :span="24">
          <div>
            <h2>登录</h2>
          </div>
        </el-col>
      </el-row>
      <hr style="margin:5% 0" />
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="auto"
        class="login-form"
      >
        <el-form-item
          label="用户名"
          prop="name"
        >
          <el-input
            v-model="form.name"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item
          label="账号类型"
          prop="accountType"
        >
          <el-select
            v-model="form.accountType"
            placeholder="请选择账号类型"
            style="width:100%"
          >
            <el-option
              label="学生"
              value="student"
            ></el-option>
            <el-option
              label="老师"
              value="teacher"
            ></el-option>
            <el-option
              label="管理员"
              value="keeper"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-row
          type="flex"
          justify="center"
        >
          <el-col :span="24">
            <el-button
              type="primary"
              @click="onLogin('form')"
              style="width:61.8%"
            >登录</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        name: '',
        password: '',
        accountType: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        accountType: [
          { required: true, message: '请选择账号类型', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onLogin (formName) {
      console.log(this.form.accountType)
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('submit!')
          switch (this.form.accountType) {
            case 'student':
              this.studentLogin()
              break
            case 'teacher':
              this.$router.push('/student')
              break
            case 'keeper':
              this.$router.push('/student')
              break
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    studentLogin () {
      console.log({
        stuNum: this.form.name,
        stuPass: this.form.password
      })
      var that = this
      this.axios.post('/student/login', {
        stuNum: this.form.name,
        stuPass: this.form.password
      }).then(response => {
        if (response.data.success) {
          this.$store.commit('setStudentId', that.form.name)
          this.$store.commit('LoadStudent', { next: () => {
            this.$router.push('/student')
          },
          id: this.form.name })
        } else {
          // 密码错误
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
h2 {
  text-align: left;
  margin-left: 5%;
}
</style>
