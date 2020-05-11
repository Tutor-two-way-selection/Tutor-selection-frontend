<template>
  <div class="student-container" @click="closeMenu($event)">
    <el-container>

      <div class="mobile-bar" v-show="draw">
        <el-button icon="el-icon-menu" @click.stop="open=!open" type=""></el-button>
      </div>
      <el-container>
        <div :class="(draw?'draw':'')+' '+(open?'open':'')" id="menu" :style="draw?'margin-top:61px':''">
          <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" style="text-align: left;" router>
            <!-- {{defaultActive}} -->
            <el-menu-item index="/student/baseInfo">
              <i class="el-icon-user-solid"></i>
              <span slot="title">修改基本信息</span>
            </el-menu-item>
            <el-submenu index="/student/regular">
              <template slot="title">
                <i class="el-icon-notebook-1"></i>
                <span slot="title">本科导师选择</span>
              </template>
              <el-menu-item-group>
                <template slot="title">
                  本科导师选择
                </template>
                <el-menu-item index="/student/regular/necessaryInfo">查看、修改个人信息</el-menu-item>
                <el-menu-item index="/student/regular/chooseTutor" :disabled="!(this.$store.state.flag['regular'])">选择导师</el-menu-item>
              </el-menu-item-group>

            </el-submenu>

            <el-submenu index="/student/graduate">
              <template slot="title">
                <i class="el-icon-notebook-2"></i>
                <span slot="title">毕业设计导师选择</span>
              </template>
              <el-menu-item-group>
                <template slot="title">
                  毕业设计导师选择
                </template>
                <el-menu-item index="/student/graduate/necessaryInfo">查看、修改个人信息</el-menu-item>
                <el-menu-item index="/student/graduate/chooseTutor" :disabled="!(this.$store.state.flag['graduate'])">选择导师</el-menu-item>
              </el-menu-item-group>

            </el-submenu>
            <el-menu-item index="/student/selectedTutor">
              <i class="el-icon-aim"></i>
              <span slot="title">查看已选导师</span>
            </el-menu-item>
            <!-- <el-menu-item index="/student/publicly">
              <i class="el-icon-data-analysis"></i>
              <span slot="title">查看公示信息</span>
            </el-menu-item> -->
            <el-menu-item index="/student/myTutor">
              <i class="el-icon-s-custom"></i>
              <span slot="title">查看本人导师信息</span>
            </el-menu-item>
            <el-menu-item @click="quit">
              <i class="el-icon-switch-button"></i>
              <span slot="title">退出登录</span>
            </el-menu-item>
          </el-menu>
        </div>
        <el-main :style="draw?'margin-top:61px':''">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    /* width: 200px; */
    min-height: 90vh;
  }
  .mobile-bar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2006;
    background: white;
    width: 100vw;
    padding: 10px;
    border-bottom: 1px solid #d6d6d6;
  }
  .draw {
    position: fixed;
    z-index: 2006;
    transform: translate(-280px, 0);
  }
  .open {
    transform: translate(0, 0);
  }
  .student-container {
    text-align: left;
    /* height: 88vh; */
  }
</style>
<script>
export default {
  data () {
    return {
      open: false,
      asideWidth: '200px',
      draw: false
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
    },
    closeMenu (el) {
      if (this.open) {
        let myPanel = document.getElementById('menu')
        this.open = myPanel.contains(el.target)
      }
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
      this.draw = true
      // this.asideWidth = '0'
    } else {
      this.draw = false
      this.open = false
      // this.asideWidth = '200px'
    }
    window.addEventListener('resize', () => {
      if (document.body.clientWidth < 900) {
        this.draw = true
        // this.asideWidth = '0'
      } else {
        this.draw = false
        this.open = false
        // this.asideWidth = '200px'
      }
    })
  }
}
</script>
