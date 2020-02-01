<template>
  <div class="login-container">
    <div class="login-container2">
      <el-row type="flex" justify="center">
        <el-col :xs="20" :sm="16" :md="12" :lg="8" :xl="8" class="">
          <el-card shadow="hover">
            <LoginComponent></LoginComponent>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import LoginComponent from '../components/LoginComponent'
export default {
  components: {
    LoginComponent
  }
}
</script>
<style lang="scss" scoped>
.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
}
.login-container2 {
  width: 100vw;
}
</style>
