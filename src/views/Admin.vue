<template>
  <div style="text-align:left">
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" style="text-align: left;" router>
          <el-menu-item index="/admin/stuDetail">
            <i class="el-icon-document"></i>
            <span slot="title">查看学生选择信息</span>
          </el-menu-item>
          <el-menu-item index="/admin/teaDetail">
            <i class="el-icon-document"></i>
            <span slot="title">查看导师信息</span>
          </el-menu-item>
          <el-submenu index="/admin/regular">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">本科导师选择</span>
            </template>
            <el-menu-item index="/admin/select/regular/twoWaySelect/first">第一轮双向选择</el-menu-item>
            <el-menu-item index="/admin/select/regular/twoWaySelect/second">第二轮双向选择</el-menu-item>
            <el-menu-item index="/admin/select/regular/manual">管理员分配</el-menu-item>
          </el-submenu>
          <el-submenu index="/admin/graduate">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">毕业设计导师选择</span>
            </template>
            <el-menu-item index="/admin/select/graduate/twoWaySelect/first">第一轮双向选择</el-menu-item>
            <el-menu-item index="/admin/select/graduate/twoWaySelect/second">第二轮双向选择</el-menu-item>
            <el-menu-item index="/admin/select/graduate/manual">管理员分配</el-menu-item>
          </el-submenu>
          <el-menu-item index="/admin/publicly">
            <i class="el-icon-document"></i>
            <span slot="title">结果公示</span>
          </el-menu-item>
          <el-menu-item index="/admin/confirm">
            <i class="el-icon-document"></i>
            <span slot="title">结果确认</span>
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
    jump (progress) {
      //   直接调用$router.push 实现携带参数的跳转
      this.$router.push({
        path: `/admin/regular/twoWaySelect/${progress}`
      })
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
