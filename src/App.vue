<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!-- <div v-if="this.$store.state.student">
      {{this.$store.state.student.stuId}}
      <hr />
      {{this.$store.state.student}}
    </div>
    <div v-if="this.$store.state.teacher">
      {{this.$store.state.teacher.teaId}}
      <hr />
      {{this.$store.state.teacher}}
    </div>
    <div v-if="this.$store.state.admin">
      {{this.$store.state.admin.admId}}
      <hr />
      {{this.$store.state.admin}}
    </div>
    {{this.$store.state}} -->

    <el-container>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>
        <div>
          <p>备案号:浙ICP备20008750号</p>
          <p>Github:<a href="https://github.com/Tutor-two-way-selection">https://github.com/Tutor-two-way-selection</a></p>
        </div>
      </el-footer>
    </el-container>

  </div>
</template>

<style lang="scss">
  * {
    margin: 0;
  }
  a {
    text-decoration: none;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .Head {
    margin-bottom: 40px;
    padding-left: 10px;
    border-left: #2c3e50 5px solid;
    h1,
    h2,
    h3,
    h4,
    h5 {
      margin-bottom: 20px;
    }
    hr {
      width: 40%;
      min-width: 220px;
    }
  }
  .head {
    margin-bottom: 20px;
    padding-left: 10px;
    border-left: #2c3e50 5px solid;
    h1,
    h2,
    h3,
    h4,
    h5 {
      // margin-bottom: 20px;
    }
    hr {
      width: 40%;
      min-width: 220px;
    }
  }
</style>
<script>
export default {
  data () {
    return {
      value1: null

    }
  },
  methods: {
    showDate () {
      console.log(JSON.stringify({ date: this.value1 }))
    },
    handleChange () {

    }
  },
  created () {
    var accountType = this.$store.state.accountType
    var json = window.sessionStorage.getItem(accountType + '-tsf')
    console.log('app created', accountType, json, JSON.parse(json))
    if (json) {
      if (accountType === 'student') {
        this.$store.commit('Flash_Flag')
        this.$store.commit('LoadStudent')
      } else if (accountType === 'admin') {
        this.$store.commit('LoadAdmin')
      }
    } else {
      this.$router.push('/login')
    }
  },
  computed: {
    listenStudent () {
      return this.$store.state.student
    },
    listenTeacher () {
      return this.$store.state.teacher
    },
    listenAdmin () {
      return this.$store.state.admin
    },
    listenAccountType () {
      return this.$store.state.accountType
    },
    listenCurrentGrade () {
      return this.$store.state.admin.currentGrade
    }
  },
  watch: {
    listenStudent: {
      handler: function (val, oldval) {
        console.log('listenStudent')
        this.$store.commit('UPDATE_Session')
        this.$store.commit('Flash_Flag')
      },
      deep: true// 对象内部的属性监听，也叫深度监听
    },
    listenTeacher: {
      handler: function (val, oldval) {
        console.log('listenTeacher')
        this.$store.commit('UPDATE_Session')
      },
      deep: true// 对象内部的属性监听，也叫深度监听
    },
    listenAdmin: {
      handler: function (val, oldval) {
        console.log('listenAdmin')
        this.$store.commit('UPDATE_Session')
      },
      deep: true// 对象内部的属性监听，也叫深度监听
    },
    listenAccountType: {
      handler: function (val, oldval) {
        console.log('listenAccountType')
        this.$store.commit('UPDATE_AccountType')
      },
      deep: true// 对象内部的属性监听，也叫深度监听
    },
    listenCurrentGrade: {
      handler: function (val, oldval) {
        console.log('listenCurrentGrade')
        // this.$store.commit('FlashBatch')

        location.reload()
      },
      deep: true// 对象内部的属性监听，也叫深度监听
    }
  }

}
</script>
