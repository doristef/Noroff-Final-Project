<template>
  <div id="app">
    <Navigation :navigation="this.navigation" :hideNavbar="this.hideNavbar" />
  </div>
</template>
<script>
import Navigation from "./components/Navigation.vue";

export default {
  name: "app",
  components: {
    Navigation
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
      var sh = document.body.scrollHeight;
      var st = document.body.scrollTop;
      var oh = document.body.offsetHeight;

      var currentScrollPosition = sh - st - oh + 1;

      if (currentScrollPosition < 0) {
        return;
      }
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 30) {
        return;
      }

      this.hideNavbar = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    } // onScroll
  },
  mounted() {
    document.body.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    document.body.removeEventListener("scroll", this.onScroll);
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
