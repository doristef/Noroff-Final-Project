<template>
  <div>
    <span v-for="(item, i) in address.results" :key="i">
      <a
        v-if="item.annotations.OSM"
        :href="item.annotations.OSM.url"
        :title="item.formatted"
      >
        {{ item.formatted }}</a
      >
      <span v-else>{{ item.formatted }}</span>
    </span>
  </div>
</template>

<script>
import axios from "axios";
const apiUrl = "https://api.opencagedata.com/geocode/v1/json?q=";
const apiKey = "&key=c442df5b4dc3433c9a4e230e8fab30f4";

export default {
  name: "location",
  props: ["latitude", "longitude"],
  created() {
    axios
      .get(apiUrl + this.latitude + "+" + this.longitude + apiKey)
      .then(response => {
        this.address = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      });
  },
  data() {
    return {
      address: [],
      errors: []
    };
  }
};
</script>
