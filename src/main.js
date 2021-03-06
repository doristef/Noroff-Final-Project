import Vue from "vue";
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;
/* Vue Router */
import Router from "vue-router";
Vue.use(Router);

/* Lodash */
import VueLodash from "vue-lodash";
import lodash from "lodash";

Vue.use(VueLodash, { name: "custom", lodash: lodash });

/* SASS - SCSS */
import BootstrapVue from "bootstrap-vue";
import "./scss/styles.scss";
Vue.use(BootstrapVue);

/* FontAwesome - FortAwesome  */
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserAlt,
  faDollarSign,
  faUtensils,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
library.add(faUserAlt, faDollarSign, faUtensils, faCheck);

new Vue({
  Router,
  store,
  render: h => h(App)
}).$mount("#app");
