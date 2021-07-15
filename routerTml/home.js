import Vue from 'vue'
import App from '@/App.vue'
import router from "./home-router.js"
import '@/plugins/element.js'
import store from '@/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
