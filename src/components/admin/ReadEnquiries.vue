<template>
  <b-container class="[ mt-2 ][ vh100 ]">
    <b-row align-h="center">
      <div v-if="loading"><h1>Loading...</h1></div>
      <!--- CARDS --->

      <b-card
        v-for="(item, i) in enquiries"
        :key="i"
        :title="item.establishment"
        tag="article"
        class="[ card-hotel ][ m-4 ]"
      >
        <b-card-sub-title>
          {{ item.clientName }}<br />
          {{ item.email }}
        </b-card-sub-title>

        <template slot="footer">
          {{ item.checkin }}<br />
          {{ item.checkout }}<br />
        </template>
      </b-card>

      <!--- CARDS END -->
    </b-row>
  </b-container>
</template>

<script>
/* Axios and apiUrl */
import axios from "axios";
const corsURL = "https://cors-anywhere.herokuapp.com/"; // Needed for Unblocking Cross-Origin request
const apiURL =
  "http://doristef.me/semester4/FinalProject/server/enquiries.json"; // API to fetch from

export default {
  name: "enquiries",
  data() {
    return {
      loading: true,
      /* Enquiries */
      enquiries: [],
      errors: []
    };
  },

  methods: {
    // API CALL
    apiCall: function() {
      axios
        .get(corsURL + apiURL)
        .then(({ data }) => {
          this.enquiries = data;
        })
        .catch(e => {
          this.errors.push(e);
        })
        .finally(() => {
          this.loading = false;
        });
    } // apiCall
  },
  created() {
    this.apiCall();
  }
};
</script>
