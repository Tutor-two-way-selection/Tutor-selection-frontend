<template>
  <div class="login-container">
    <div class="login-container2">
      <el-row type="flex" justify="center">
        <el-col :xs="20" :sm="16" :md="12" :lg="8" :xl="8" class="">
          <el-card shadow="hover">
            <LoginComponent ref="logincomp"></LoginComponent>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="fix-box">
      <el-collapse v-model="activeNames" style="padding: 20px;">
        <h3>测试用账号</h3>
        <el-collapse-item title="学生:" name="1">
          <div class="account-container" @click="putinAccount('201706060101','12345678','student')">
            <p>账号:201706060101</p>
            <p>密码:12345678</p>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2" title="教师:">
          <div class="account-container" @click="putinAccount('1001','12345678','teacher')">
            <p>账号:1001</p>
            <p>密码:12345678</p>
          </div>
          <div class="account-container" @click="putinAccount('1002','12345678','teacher')">
            <p>账号:1002</p>
            <p>密码:12345678</p>
          </div>
          <div class="account-container" @click="putinAccount('1003','12345678','teacher')">
            <p>账号:1003</p>
            <p>密码:12345678</p>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3" title="管理员:">
          <div class="account-container" @click="putinAccount('123456','123456','keeper')">
            <p>账号:123456</p>
            <p>密码:123456</p>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import LoginComponent from '../components/LoginComponent'
export default {
  data () {
    return {
      activeNames: []
    }
  },
  components: {
    LoginComponent
  },
  methods: {
    putinAccount (name, password, accountType) {
      this.$refs.logincomp.form.name = name
      this.$refs.logincomp.form.password = password
      this.$refs.logincomp.form.accountType = accountType
    }
  }
}
</script>
<style lang="scss" scoped>
  .login-container {
    height: 88vh;
    display: flex;
    align-items: center;
  }
  .login-container2 {
    width: 100vw;
  }
  .fix-box {
    position: fixed;
    right: 50px;
    top: 50px;
    width: 300px;
    text-align: left;
    background: white;
    border: #2c3e50;
  }
  .account-container {
    text-align: left;
    cursor: pointer; //鼠标悬浮变 '手';
    border: 1px solid #dcdfe6;
    padding: 12px 20px;
    border-radius: 4px;
    margin: 5px 0;
  }
  .account-container:hover {
    background: #fff;
    border-color: #409eff;
    color: #409eff;
  }
</style>
