<template>
  <b-container fluid class="[ header ][ vh100 ]">
    <Search
      :rowClass="this.class"
      :establishments="this.establishments"
    /> </b-container
  ><!-- container -->
</template>

<script>
import Search from "./Search.vue";
export default {
  name: "pageHeader",
  props: ["establishments"],
  components: { Search },
  data() {
    return {
      class: "vh100"
    };
  }
};
</script>
