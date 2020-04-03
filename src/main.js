import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store/store'

import "./assets/scss/application.scss"
import "./config/_icons.js"
import "./config/_globalComponents.js"

import lineClamp from 'vue-line-clamp'
Vue.use(lineClamp)

import moment from 'moment'
Vue.prototype.moment = moment

import VCalendar from 'v-calendar'
Vue.use(VCalendar, {
  componentPrefix: 'ei'
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
