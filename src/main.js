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
axios.defaults.baseURL = 'http://nbcairongjiu.cn:8080'
axios.interceptors.request.use(
  config => {
    // 默认参数设置：所有接口都必须传的值（比如：userId）
    // let defaultParams = {
    //   userId: store.state.userId
    // };
    // 自定义header信息（比如token）
    // config.headers['csrf-token'] = store.state.token;
    config.headers['csrf-token'] = sessionStorage.getItem('csrf-token') || ''
    // 默认值与接口传来的参数进行合并（注：接口参数与默认值不可重复）
    // config.data = Object.assign(defaultParams, config.data);
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

Vue.use(VueAxios, axios)
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
