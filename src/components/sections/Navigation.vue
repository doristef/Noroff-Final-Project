<template>
  <div class="[ nav-container ]" :class="{ 'nav-container-hide': hideNavbar }">
    <!--- ADMIN NAVIGATION -->
    <div class="[ nav-admin nav-admin-big ][ mr-2 ]">
      <router-link
        to="/admin"
        class="[ navigation-link ]"
        exact-active-class="[ navigation-link-active ]"
        v-if="!authenticated"
      >
        <span class="[ navigation-list-item ][ mr-1 ]" @click="navClick()">
          Admin
        </span>
      </router-link>
      <div v-else class="[ navigation-link ]" @click="logOut()">
        <span class="[ navigation-list-item ][ mr-1 ]" @click="navClick()">
          Logout
        </span>
      </div>
    </div>
    <!--- ADMIN NAVIGATION END! -->

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
          <ul class="[ navigation-list ]" v-if="!authenticated">
            <router-link
              to="/"
              class="[ navigation-link ][ small-screen-only ]"
              exact-active-class="[ navigation-link-active ]"
            >
              <li class="[ navigation-list-item ]" @click="navClick()">
                Home
              </li>
            </router-link>
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

          <!--- ADMIN NAVIGATION -->
          <ul class="[ navigation-list ]" v-else>
            <router-link
              to="/"
              class="[ navigation-link ][ small-screen-only ]"
              exact-active-class="[ navigation-link-active ]"
            >
              <li class="[ navigation-list-item ]" @click="navClick()">
                Holidaze
              </li>
            </router-link>
            <router-link
              to="/admin/enquiries"
              class="[ navigation-link ]"
              exact-active-class="[ navigation-link-active ]"
            >
              <li class="[ navigation-list-item ]" @click="navClick()">
                Enquiries
              </li>
            </router-link>

            <router-link
              to="/admin/messages"
              class="[ navigation-link ]"
              exact-active-class="[ navigation-link-active ]"
            >
              <li class="[ navigation-list-item ]" @click="navClick()">
                Messages
              </li>
            </router-link>

            <router-link
              to="/admin/addestablishment"
              class="[ navigation-link ]"
              exact-active-class="[ navigation-link-active ]"
            >
              <li class="[ navigation-list-item ]" @click="navClick()">
                Add Establishment
              </li>
            </router-link>
            <router-link
              to="/accomodations"
              class="[ navigation-link ]"
              exact-active-class="[ navigation-link-active ]"
            >
              <li class="[ navigation-list-item ]" @click="navClick()">
                Establishments
              </li>
            </router-link>
          </ul>
          <!--- ADMIN NAVIGATION END! --->

          <div class="[ nav-admin nav-admin-min ][ mr-2 ]">
            <router-link
              to="/admin"
              class="[ navigation-link ]"
              exact-active-class="[ navigation-link-active ]"
              v-if="!authenticated"
            >
              <span
                class="[ navigation-list-item navigation-list-item-admin ]"
                @click="navClick()"
              >
                Admin
              </span>
            </router-link>
            <div v-else class="[ navigation-link ]" @click="logOut()">
              <span class="[ navigation-list-item ]" @click="navClick()">
                Logout
              </span>
            </div>
          </div>
          <!--- ADMIN NAVIGATION END! -->
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
import { mapState } from "vuex";

export default {
  name: "navigation",
  props: ["navigation", "hideNavbar"],
  data: () => ({
    navText: "Open",
    isOpen: false,
    clicked: false
  }),
  computed: mapState(["authenticated"]),
  methods: {
    navClick() {
      if (window.innerWidth < 1020) {
        this.clicked = !this.clicked;
      }
    },
    logOut() {
      this.$store.commit("changeState");
      sessionStorage.removeItem("AuthToken");
      this.$router.push("/");
    }
  }
};
</script>
