<template>
  <b-container class="[ mt-2 mb-3 ][ vh100 ]">
    <b-row align-h="center" class="[ admin-splitter ][ mb-2 ]">
      <b-col align-self="center" class="[ mt-2 mb-1 ][ text-center ]">
        <h3 class="[ admin-splitter-heading ]">
          Enquiries
          <b-badge pill variant="light" class="[ admin-pill ]">
            {{ enquiries.length }}
          </b-badge>
        </h3>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <div v-if="loading"><h1>Loading...</h1></div>
      <!--- CARDS --->

      <b-card
        v-for="(item, i) in enquiries"
        :key="i"
        tag="article"
        class="[ card-hotel ][ m-4 ]"
      >
        <b-card-title
          ><b>{{ item.clientName }}</b></b-card-title
        >
        <b-card-sub-title>
          {{ item.email }}
        </b-card-sub-title>
        <b-card-body>
          <div class="[ card-text-bigger ]">
            <b class="[ card-text-bold ]">{{ item.establishment }}</b
            ><br />
            Are those dates available:
          </div>
          <div class="[ d-inline-block ]">
            <b class="[ card-text-bold ]">Check in:</b><br />
            {{ item.checkin }} <br />
          </div>
          <div class="[ d-inline-block ][ float-right ][ mr-3 ]">
            <b class="[ card-text-bold ]">Check out:</b><br />
            {{ item.checkout }}<br />
          </div>
          <div class="[ mt-5 mb-2 ][ text-center ]">
            <b-button variant="primary" type="button"
              ><a
                :href="
                  'mailto:' +
                    item.email +
                    '?subject=Holidaze%20-%20' +
                    item.establishment +
                    '&body=Are%20these%20dates%20available%20' +
                    item.checkin +
                    '%20to%20' +
                    item.checkout
                "
                class="[ card-button ]"
                >Reply enquirie</a
              ></b-button
            >
          </div>
        </b-card-body>
      </b-card>

      <!--- CARDS END -->
    </b-row>
  </b-container>
</template>

<script>
/* Axios and apiUrl */
import axios from "axios";
const corsURL = ""; // Needed for Unblocking Cross-Origin request - https://cors-anywhere.herokuapp.com/
const apiURL =
  "http://doristef.me/semester4/FinalProject/server/enquiries.json"; // API to fetch from
const apiConfig = {
  headers: { "Content-Type": "application/json" },
  responseType: "json",
  AccessControlAllowOrigin: "https://doristef.me"
};

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
        .get(corsURL + apiURL, apiConfig)
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
