import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

/* Lodash */
import VueLodash from "vue-lodash";
const options = { name: "lodash" };
Vue.use(VueLodash, options);

/* SASS - SCSS */
import BootstrapVue from "bootstrap-vue";
import "./scss/styles.scss";
import "animate.css/animate.css";
Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
