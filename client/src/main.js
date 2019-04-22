import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2'

axios.defaults.baseURL = 'http://localhost:3000'

Vue.prototype.$axios = axios
Vue.use(VueSweetalert2);
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
