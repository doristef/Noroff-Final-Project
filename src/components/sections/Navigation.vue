<template>
  <div class="[ nav-container ]" :class="{ 'nav-container-hide': hideNavbar }">
    <div class="[ nav-admin nav-admin-big ][ mr-2 ]">
      <router-link
        to="/admin"
        class="[ navigation-link ]"
        active-class="[ navigation-link-active ]"
      >
        <span class="[ navigation-list-item ]" @click="navClick()">
          Admin
        </span>
      </router-link>
    </div>
    <div class="[ nav ]">
      <div class="[ nav-brand ]" @click="clicked ? navClick() : ''">
        <router-link to="/" class="[ nav-brand-text ]">
          Holidaze
        </router-link>
      </div>

      <div class="[ nav-hamburger ]" @click="navClick()">
        <div
          class="[ nav-hamburger-bar nav-hamburger-bar-1 ]"
          :class="{ '[ nav-hamburger-bar-1-change ]': clicked }"
        ></div>
        <div
          class="[ nav-hamburger-bar nav-hamburger-bar-2 ]"
          :class="{ '[ nav-hamburger-bar-2-change ]': clicked }"
        ></div>
        <div
          class="[ nav-hamburger-bar nav-hamburger-bar-3 ]"
          :class="{ '[ nav-hamburger-bar-3-change ]': clicked }"
        ></div>
      </div>

      <div
        class="[ navigation-overlay navigation ]"
        :class="[clicked ? '[ navigation-show ]' : '[ navigation-hide ]']"
      >
        <div
          class="[ navigation ]"
          :class="[clicked ? '[ navigation-show ]' : '[ navigation-hide ]']"
        >
          <ul class="[ navigation-list ]">
            <router-link
              to="/accomodations"
              class="[ navigation-link ]"
              active-class="[ navigation-link-active ]"
            >
              <li class="[ navigation-list-item ]" @click="navClick()">
                Accomodations
              </li>
            </router-link>

            <router-link
              to="/contact"
              class="[ navigation-link ]"
              active-class="[ navigation-link-active ]"
            >
              <li class="[ navigation-list-item ]" @click="navClick()">
                Contact Us
              </li>
            </router-link>
          </ul>
          <div class="[ nav-admin nav-admin-min ][ mr-2 ]">
            <router-link
              to="/admin"
              class="[ navigation-link ]"
              active-class="[ navigation-link-active ]"
            >
              <span
                class="[ navigation-list-item navigation-list-item-admin ]"
                @click="navClick()"
              >
                Admin
              </span>
            </router-link>
          </div>
        </div>
        <!-- navigation -->
      </div>
      <!-- navigation-overlay -->
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
    navClick() {
      if (window.innerWidth < 1020) {
        this.clicked = !this.clicked;
      }
    }
  }
};
</script>
