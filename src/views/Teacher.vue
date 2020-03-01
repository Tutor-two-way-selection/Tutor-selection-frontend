<template>
  <div style="text-align:left">
    <el-container>
      <el-aside :width="asideWidth">
        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" style="text-align: left;" router>
          <!-- {{defaultActive}} -->
          <el-menu-item index="/teacher/teachInfo">
            <i class="el-icon-s-custom"></i>
            <span slot="title">修改个人信息</span>
          </el-menu-item>
          <el-menu-item index="/teacher/regular">
            <i class="el-icon-notebook-1"></i>
            <span slot="title">本科导师选择</span>
          </el-menu-item>
          <el-menu-item index="/teacher/graduate">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">毕业导师选择</span>
          </el-menu-item>
          <!-- <el-menu-item index="/teacher/publicly">
            <i class="el-icon-document"></i>
            <span slot="title">查看公示信息</span>
          </el-menu-item> -->
          <el-menu-item index="/teacher/accepted">
            <i class="el-icon-user-solid"></i>
            <span slot="title">查看接收的学生</span>
          </el-menu-item>
          <el-menu-item @click="quit">
            <i class="el-icon-switch-button"></i>
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
      isCollapse: false,
      asideWidth: '200px'
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
  },
  mounted () {
    if (document.body.clientWidth < 900) {
      this.isCollapse = true
      this.asideWidth = '65px'
    } else {
      this.isCollapse = false
      this.asideWidth = '200px'
    }
    window.addEventListener('resize', () => {
      if (document.body.clientWidth < 900) {
        this.isCollapse = true
        this.asideWidth = '65px'
      } else {
        this.isCollapse = false
        this.asideWidth = '200px'
      }
    })
  }
}
</script>
