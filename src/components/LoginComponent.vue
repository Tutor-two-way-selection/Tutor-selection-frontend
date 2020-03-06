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
      <hr style="margin:5% 0">
      <el-form ref="form" :model="form" :rules="rules" label-width="auto" class="login-form">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="账号类型" prop="accountType">
          <el-select v-model="form.accountType" placeholder="请选择账号类型" style="width:100%">
            <el-option label="学生" value="student"></el-option>
            <el-option label="老师" value="teacher"></el-option>
            <el-option label="管理员" value="keeper"></el-option>
          </el-select>
        </el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="24">
            <el-button type="primary" @click="onLogin('form')" style="width:61.8%">登录</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-form ref="changePassForm" :model="changePassForm" :rules="changeRules" label-width="auto">
        <!-- <el-form-item label="旧密码" prop='oldPassWord'>
          <el-input v-model="changePassForm.oldPassWord" autocomplete="off" show-password></el-input>
        </el-form-item> -->
        <el-form-item label="新密码" prop='newPassWord'>
          <el-input v-model="changePassForm.newPassWord" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop='repeat'>
          <el-input v-model="changePassForm.repeat" autocomplete="off" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePass('changePassForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    var validatePass1 = (rule, value, callback) => {
      if (value === this.form.password) {
        callback(new Error('新旧密码不得相同'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.changePassForm.newPassWord) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '',
        password: '',
        accountType: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur' }
        ],
        accountType: [
          { required: true, message: '请选择账号类型', trigger: 'blur' }
        ]
      },
      changePassForm: {
        oldPassWord: '',
        newPassWord: '',
        repeat: ''
      },
      changeRules: {
        oldPassWord: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          { min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur' }
        ],
        newPassWord: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur' },
          { validator: validatePass1, trigger: 'blur' }
        ],
        repeat: [
          // { required: true, message: '请确认密码', trigger: 'blur' },
          // { min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      formLabelWidth: 'auto'
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
              // this.$router.push('/student')
              this.teacherLogin()
              break
            case 'keeper':
              this.adminLogin()
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
        stuID: this.form.name,
        stuPass: this.form.password
      })
      var that = this
      this.axios
        .post('/student/login', {
          stuID: this.form.name,
          stuPass: this.form.password
        })
        .then(response => {
          if (response.data.success) {
            console.log(response.data)
            if (response.data.passChanged) {
              this.$store.commit('setAccountType', 'student')
              this.$store.commit('setStudentId', that.form.name)
              this.$store.commit('LoadStudent', {
                next: () => {
                  this.$router.push('/student')
                },
                id: this.form.name
              })
            } else {
              that.dialogVisible = true
            }
          } else {
            console.log(response.data)
            // TODO 密码错误
            this.$notify.error({
              title: '错误',
              message: response.data.err
            })
          }
        })
        .catch(err => {
          this.$notify({
            title: '异常',
            message: err,
            type: 'warning'
          })
          console.log(err)
        })
    },
    teacherLogin () {
      // TODO 修改接口
      console.log({
        teaNum: this.form.name,
        teaPass: this.form.password
      })
      var that = this
      this.axios
        .post('/teacher/login', {
          teaNum: this.form.name,
          teaPass: this.form.password
        })
        .then(response => {
          if (response.data.success) {
            this.$store.commit('setAccountType', 'teacher')
            this.$store.commit('setTeacherId', that.form.name)
            this.$router.push('/teacher')
          } else {
            // TODO 密码错误
            this.$notify.error({
              title: '错误',
              message: response.data.err
            })
          }
        })
        .catch(err => {
          this.$notify({
            title: '异常',
            message: err,
            type: 'warning'
          })
          console.log(err)
        })
    },
    adminLogin () {
      var that = this
      this.axios
        .post('/admin/login', {
          admNum: this.form.name,
          admPass: this.form.password
        })
        .then(response => {
          if (response.data.success) {
            this.$store.commit('setAccountType', 'admin')
            this.$store.commit('setAdminId', that.form.name)
            this.$store.commit('LoadAdmin', {
              next: () => {
                this.$router.push('/admin')
              },
              id: this.form.name,
              grades: response.data.grades
            })
          } else {
            // TODO 密码错误
            this.$notify.error({
              title: '错误',
              message: response.data.err
            })
          }
        })
        .catch(err => {
          this.$notify({
            title: '异常',
            message: err,
            type: 'warning'
          })
          console.log(err)
        })
    },
    changePass (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('submit!')
          console.log({
            stuID: this.form.name,
            // oldPass: this.changePassForm.oldPassWord,
            oldPass: this.form.password,
            newPass: this.changePassForm.newPassWord
          })
          // var that = this
          this.axios
            .post('/student/changePass', {
              stuID: this.form.name,
              // oldPass: this.changePassForm.oldPassWord,
              oldPass: this.form.password,
              newPass: this.changePassForm.newPassWord
            })
            .then(response => {
              if (response.data.success) {
                this.$store.commit('setAccountType', 'student')
                this.$store.commit('setStudentId', this.form.name)
                this.$store.commit('LoadStudent', {
                  next: () => {
                    this.$router.push('/student')
                  },
                  id: this.form.name
                })
              } else {
                // TODO 密码错误
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
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
