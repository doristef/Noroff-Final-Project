import Vue from "vue";
import Router from "vue-router";
import PageHeader from "./components/sections/Header.vue";
import PageFront from "./components/Frontpage.vue";
import Hotels from "./components/establishment/Hotels.vue";
import HotelSearch from "./components/establishment/HotelSearch.vue";
import HotelSpecific from "./components/establishment/HotelSpecific.vue";
import HotelCheck from "./components/establishment/HotelCheck.vue";
import Contact from "./components/Contact.vue";
import ThankYou from "./components/ThankYou.vue";

/* ADMIN */
import Login from "./components/admin/Login.vue";

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
      path: "/accomodations/search/:search",
      component: HotelSearch
    },
    {
      path: "/accomodations/:id/book/",
      component: HotelCheck
    },
    {
      path: "/accomodations/:id",
      component: HotelSpecific
    },
    {
      path: "/contact",
      component: Contact
    },
    {
      path: "/thankyou",
      component: ThankYou
    },
    {
      path: "/admin",
      component: Login
    }
  ],
  // eslint-disable-next-line
    scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});
