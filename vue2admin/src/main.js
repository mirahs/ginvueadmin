import Vue from 'vue'
// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// VueClipboard2
import VueClipboard2 from 'vue-clipboard2'

import '@/assets/css/global.css'

import App from './App.vue'
import router from './router'
import store from './store'


Vue.config.productionTip = false

// ElementUI
Vue.use(ElementUI)
// VueClipboard2
Vue.use(VueClipboard2)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
