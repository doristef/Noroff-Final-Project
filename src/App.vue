<template>
  <div id="app">
    <Navigation :navigation="this.navigation" :hideNavbar="this.hideNavbar" />
    <router-view
      :establishments="this.establishments"
      @searchEstablishment="onSearch"
    />
    <router-view name="helper" />
    <PageFooter />
  </div>
</template>
<script>
/* Import Components */
import Navigation from "./components/sections/Navigation.vue";
import PageFooter from "./components/sections/Footer.vue";
import router from "./router.js";

/* FETCH All Establishments */
import axios from "axios";
const corsURL = "https://cors-anywhere.herokuapp.com/"; // Needed for Unblocking Cross-Origin request
const apiURL =
  "http://doristef.me/semester4/FinalProject/server/establishments.json"; // API to fetch from
/* -------------- */
/* LOGIN */
(function() {
  localStorage.setItem("username", "doristef");
  localStorage.setItem("password", "1234");
})();

export default {
  name: "app",
  router,
  components: {
    Navigation,
    PageFooter
  },
  data() {
    return {
      /* Establishments */
      establishments: [],
      errors: [],
      search: "",
      /* NAVIGATION */
      navigation: {
        accomodations: "Accomodations",
        contact: "Contact Us"
      },
      /* NAVIGATION END */
      hideNavbar: false,
      lastScrollPosition: 0
    };
  },

  methods: {
    // API CALL
    apiCall: function() {
      axios
        .get(corsURL + apiURL)
        .then(({ data }) => {
          this.establishments = data;
        })
        .catch(e => {
          this.errors.push(e);
        })
        .finally(() => {
          this.loading = false;
        });
    }, // apiCall

    // ON SCROLL
    onScroll: function() {
      var sy = window.scrollY;
      var ih = window.innerHeight;
      var currentScrollPosition = sy + ih;
      if (currentScrollPosition < 0) {
        return;
      }
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 30) {
        return;
      }

      this.hideNavbar = currentScrollPosition > this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    }, // onScroll

    onSearch: function(e) {
      this.search = e;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  created() {
    this.apiCall();
  }
};
</script>
