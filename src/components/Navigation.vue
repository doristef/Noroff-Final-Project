<template>
  <div class="[ navigation-container ]">
    <div class="nav">
      <div class="nav-brand">
        Holidaze
      </div>
      <div class="nav-hamburger" @click="navClick()">
        <div
          class="nav-hamburger-bar nav-hamburger-bar-1"
          :class="{ 'nav-hamburger-bar-1-change': clicked }"
        ></div>
        <div
          class="nav-hamburger-bar nav-hamburger-bar-2"
          :class="{ 'nav-hamburger-bar-2-change': clicked }"
        ></div>
        <div
          class="nav-hamburger-bar nav-hamburger-bar-3"
          :class="{ 'nav-hamburger-bar-3-change': clicked }"
        ></div>
      </div>

      <div
        class="navigation"
        :class="[clicked ? 'navigation-show' : 'navigation-hide']"
      >
        <ul>
          <a href="#" class="navigation-link"
            ><li class="navigation-list-item">Accomodations</li></a
          >
          <a href="#" class="navigation-link"
            ><li class="navigation-list-item">Contact Us</li></a
          >
        </ul>
      </div>
    </div>
    <!-- nav -->
  </div>
  <!-- navigation-container -->
</template>

<script>
export default {
  name: "navigation",
  props: ["navigation", "hideNavbar"],
  data: () => ({
    navText: "Open",
    isOpen: false,
    clicked: false
  }),
  methods: {
    open() {
      this.isOpen = true;
      this.navText = "Close";
    },
    close() {
      this.isOpen = false;
      this.navText = "Open";
    },
    toggle() {
      this.isOpen ? this.close() : this.open();
    },
    navClick() {
      this.clicked = !this.clicked;
    }
  }
};
</script>
