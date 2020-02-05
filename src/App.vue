<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!-- {{JSON.parse(window.sessionStorage.getItem('student'))}} -->
    <div v-if="this.$store.state.student">
      {{this.$store.state.student.stuId}}
      <hr>
      {{this.$store.state}}
    </div>
    <router-view />
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
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
</style>
<script>
export default {
  created () {
    var accountType = 'student'
    var json = window.sessionStorage.getItem(accountType)
    console.log('app created', json)
    if (window.sessionStorage.getItem(accountType)) {
      console.log(JSON.parse(window.sessionStorage.getItem(accountType)))
      this.$store.commit('Flash_Flag')
    } else {
      this.$router.push('/login')
    }
  },
  computed: {
    listenStudent () {
      return this.$store.state.student
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
    }
  }

}
</script>
