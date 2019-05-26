import Vue from "vue";
import Router from "vue-router";
import PageHeader from "./components/Header.vue";
import PageFront from "./components/Frontpage.vue";
import Hotels from "./components/Hotels.vue";
import HotelSearch from "./components/HotelSearch.vue";
import HotelSpecific from "./components/HotelSpecific.vue";
import HotelCheck from "./components/HotelCheck.vue";
import Contact from "./components/Contact.vue";
import ThankYou from "./components/ThankYou.vue";

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
    }
  ],
  // eslint-disable-next-line
    scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});
