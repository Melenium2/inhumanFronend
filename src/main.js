import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/scss/application.scss"
import "./config/_icons.js"
import "./config/_globalComponents.js"

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
