<template>
  <div class="admin-container" @click="closeMenu($event)">

    <div class="mobile-bar" v-show="draw">
      <el-button icon="el-icon-menu" @click.stop="open=!open" type=""></el-button>
    </div>
    <el-container>
      <div :class="(draw?'draw':'')+' '+(open?'open':'')" id="menu" :style="draw?'margin-top:61px':''">
        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="draw" style="text-align: left;" router>
          <el-menu-item index="/admin/stuDetail">
            <!-- <i class="el-icon-document"></i>
            <span slot="title">查看学生信息</span> -->
            <el-select v-model="currentGrade" filterable placeholder="请选择">
              <el-option v-for="item in this.$store.state.admin.grades" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-menu-item>
          <el-menu-item index="/admin/stuDetail">
            <i class="el-icon-user-solid"></i>
            <span slot="title">查看学生信息</span>
          </el-menu-item>
          <el-menu-item index="/admin/teaDetail">
            <i class="el-icon-s-custom"></i>
            <span slot="title">查看导师信息</span>
          </el-menu-item>
          <el-submenu index="/admin/regular" :disabled="!(this.$store.state.admin.currentBatch.regular>=1)">
            <template slot="title">
              <i class="el-icon-notebook-1"></i>
              <span slot="title">本科导师选择</span>
            </template>
            <el-menu-item-group>
              <template slot="title">
                本科导师选择
              </template>
              <el-menu-item index="/admin/select/regular/Situation/first">第一轮双向选择</el-menu-item>
              <el-menu-item index="/admin/select/regular/Situation/second" :disabled="!(this.$store.state.admin.currentBatch.regular>=2)">第二轮双向选择</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">
              </template>
              <el-menu-item index="/admin/select/regular/manual" :disabled="!(this.$store.state.admin.currentBatch.regular>=3)">管理员分配</el-menu-item>
              <el-menu-item index="/admin/select/regular/Situation/third" :disabled="!(this.$store.state.admin.currentBatch.regular>=3)">导师分配情况</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="/admin/graduate" :disabled="!(this.$store.state.admin.currentBatch.graduate>=1)">
            <template slot="title">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">毕业设计导师选择</span>
            </template>
            <el-menu-item-group>
              <template slot="title">
                本科导师选择
              </template>
              <el-menu-item index="/admin/select/graduate/Situation/first">第一轮双向选择</el-menu-item>
              <el-menu-item index="/admin/select/graduate/Situation/second" :disabled="!(this.$store.state.admin.currentBatch.graduate>=2)"> 第二轮双向选择</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">
              </template>
              <el-menu-item index="/admin/select/graduate/manual" :disabled="!(this.$store.state.admin.currentBatch.graduate>=3)">管理员分配</el-menu-item>
              <el-menu-item index="/admin/select/graduate/Situation/third" :disabled="!(this.$store.state.admin.currentBatch.graduate>=3)">导师分配情况</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/admin/publicly">
            <i class="el-icon-data-analysis"></i>
            <span slot="title">公示与确认</span>
          </el-menu-item>
          <!-- <el-menu-item index="/admin/confirm">
            <i class="el-icon-document"></i>
            <span slot="title">结果确认</span>
          </el-menu-item> -->
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
  </div>
</template>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    /* width: 200px; */
    min-height: 90vh;
  }
  .admin-container {
    text-align: left;
    /* height: 100vh; */
  }
</style>
<script>
export default {
  data () {
    return {
      asideWidth: '200px',
      currentGrade: this.$store.state.admin.currentGrade,
      open: false,
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
    jump (progress) {
      //   直接调用$router.push 实现携带参数的跳转
      this.$router.push({
        path: `/admin/regular/Situation/${progress}`
      })
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
  watch: {
    currentGrade: {
      handler: function (val, oldval) {
        console.log('currentGrade')
        this.$store.commit('setCurrentGrade', val)
      },
      deep: true// 对象内部的属性监听，也叫深度监听
    }
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
