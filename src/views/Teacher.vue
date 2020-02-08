<template>
  <div style="text-align:left">
    <el-container>
      <el-aside width="200px">
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group> -->
        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" style="text-align: left;" router>
          <!-- {{defaultActive}} -->
          <el-menu-item index="/teacher/teachInfo">
            <i class="el-icon-document"></i>
            <span slot="title">修改个人信息</span>
          </el-menu-item>
          <el-menu-item @click="quit">
            <i class="el-icon-document"></i>
            <span slot="title">退出登录</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  /* width: 200px; */
  min-height: 90vh;
}
</style>
<script>
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    quit () {
      this.$router.push('/')
      this.$store.commit('LOGOUT')
    }
  },
  computed: {
    defaultActive () {
      return this.$route.path.split('#').reverse()[0]
    }
  }
}
</script>
