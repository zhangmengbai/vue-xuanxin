import Vue from 'vue'
import App from './App'
import router from './router'
// import { VueTypedJs } from 'vue-typed-js'

Vue.config.productionTip = false
// Vue.use(VueTypedJs)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
