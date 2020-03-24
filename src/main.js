import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store/store'

import "./assets/scss/application.scss"
import "./config/_icons.js"
import "./config/_globalComponents.js"

import lineClamp from 'vue-line-clamp'
Vue.use(lineClamp)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
