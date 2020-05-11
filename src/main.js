import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

// require('./mock')

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://nbcairongjiu.cn'
Vue.use(VueAxios, axios)
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
