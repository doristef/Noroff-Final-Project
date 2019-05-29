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
import Enquiries from "./components/admin/ReadEnquiries.vue";
import Messages from "./components/admin/ReadMessage.vue";
import AddEstablishment from "./components/admin/AddEstablishment.vue";

Vue.use(Router);

const router = new Router({
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
    },
    {
      path: "/admin/dash",
      components: {
        default: Enquiries,
        helper: Messages
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/admin/enquiries",
      component: Enquiries,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/admin/messages",
      component: Messages,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/admin/addestablishment",
      component: AddEstablishment,
      meta: {
        requiresAuth: true
      }
    }
  ],
  // eslint-disable-next-line
    scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (sessionStorage.getItem("AuthToken")) {
      next();
      return;
    }
    next("/admin");
  } else {
    next();
  }
});

export default router;
