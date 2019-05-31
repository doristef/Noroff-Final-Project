<template>
  <b-container fluid class="[ header ][ vh100 ]">
    <Search
      rowClass="vh100"
      :establishments="this.establishments"
      :button="true"
      :predict="true"
      :description="false"
      placeholder="Search"
    /> </b-container
  ><!-- container -->
</template>

<script>
import Search from "./Search.vue";
export default {
  name: "pageHeader",
  props: ["establishments"],
  components: { Search }
};
</script>
