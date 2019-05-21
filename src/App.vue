<template>
  <div id="app">
    <Navigation :navigation="this.navigation" :hideNavbar="this.hideNavbar" />
    <PageHeader />
    <Frontpage />
    <PageFooter />
  </div>
</template>
<script>
import Navigation from "./components/Navigation.vue";
import PageHeader from "./components/Header.vue";
import Frontpage from "./components/Frontpage.vue";
import PageFooter from "./components/Footer.vue";

export default {
  name: "app",
  components: {
    Navigation,
    PageHeader,
    Frontpage,
    PageFooter
  },
  data() {
    return {
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
    onScroll() {
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
    } // onScroll
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  }
};
</script>
<!--
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
-->
