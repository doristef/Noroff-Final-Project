import Vue from "vue";
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;
/* Vue Router */
import Router from "vue-router";
Vue.use(Router);

/* Lodash */
import VueLodash from "vue-lodash";
const options = { name: "lodash" };
Vue.use(VueLodash, options);

/* SASS - SCSS */
import BootstrapVue from "bootstrap-vue";
import "./scss/styles.scss";
Vue.use(BootstrapVue);

/* FontAwesome - FortAwesome  */
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserAlt, faDollarSign } from "@fortawesome/free-solid-svg-icons";
library.add(faUserAlt, faDollarSign);

new Vue({
  Router,
  store,
  render: h => h(App)
}).$mount("#app");
