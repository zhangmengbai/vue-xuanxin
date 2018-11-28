import Vue from 'vue'
import App from './App'
import router from './router'
// import { VueTypedJs } from 'vue-typed-js'

import 'common/stylus/icon.styl'
import  BaseDialog from 'components/base/BaseDialog'

Vue.component('base-dialog', BaseDialog);
Vue.config.productionTip = false;
// Vue.use(VueTypedJs)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
