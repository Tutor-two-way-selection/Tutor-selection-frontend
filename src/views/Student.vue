<template>
  <div style="text-align:left">
    <el-container>
      <el-aside :width="asideWidth">
        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" style="text-align: left;" router>
          <!-- {{defaultActive}} -->
          <el-submenu index="/student/regular">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">本科导师选择</span>
            </template>
            <el-menu-item index="/student/regular/necessaryInfo">查看、修改个人信息</el-menu-item>
            <el-menu-item index="/student/regular/chooseTutor" :disabled="!(this.$store.state.flag['regular'])">选择导师</el-menu-item>
          </el-submenu>

          <el-submenu index="/student/graduate">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">毕业设计导师选择</span>
            </template>
            <el-menu-item index="/student/graduate/necessaryInfo">查看、修改个人信息</el-menu-item>
            <el-menu-item index="/student/graduate/chooseTutor" :disabled="!(this.$store.state.flag['graduate'])">选择导师</el-menu-item>
          </el-submenu>
          <el-menu-item index="/student/selectedTutor">
            <i class="el-icon-document"></i>
            <span slot="title">查看已选导师</span>
          </el-menu-item>
          <el-menu-item index="/student/publicly">
            <i class="el-icon-document"></i>
            <span slot="title">查看公示信息</span>
          </el-menu-item>
          <el-menu-item index="/student/myTutor">
            <i class="el-icon-document"></i>
            <span slot="title">查看本人导师信息</span>
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
  created () {
    this.$store.commit('Flash_Flag')
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
