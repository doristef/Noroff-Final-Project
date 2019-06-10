<template>
  <b-container fluid class="[ header ][ vh100 ]" :class="'[ ' + header + ' ]'">
    <Search
      rowClass="vh100"
      :establishments="this.establishments"
      :button="false"
      :predict="true"
      :description="false"
      size="lg"
      placeholder="Search, f.ex. Sunset Beach"
    /> </b-container
  ><!-- container -->
</template>

<script>
import Search from "./Search.vue";

export default {
  name: "pageHeader",
  props: ["establishments"],
  components: { Search },
  computed: {
    header: function() {
      return "header-" + Math.floor(Math.random() * 4 + 1);
    }
  }
};
</script>
