import Vue from "vue";
import Router from "vue-router";
import PageHeader from "./components/Header.vue";
import PageFront from "./components/Frontpage.vue";
import Hotels from "./components/Hotels.vue";
import HotelSpecific from "./components/HotelSpecific.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      components: {
        default: PageHeader,
        helper: PageFront
      }
    },
    {
      path: "/accomodations",
      component: Hotels
    },
    {
      path: "/accomodations/:id",
      component: HotelSpecific
    },
    {
      path: "/contact",
      component: PageHeader
    }
  ],
  // eslint-disable-next-line
    scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});
