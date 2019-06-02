<template>
  <b-container class="[ mt-2 mb-3 ][ vh100 ]">
    <b-row align-h="center" class="[ admin-splitter ][ mb-2 ]">
      <b-col align-self="center" class="[ mt-2 mb-1 ][ text-center ]">
        <h3 class="[ admin-splitter-heading ]">
          Messages
          <b-badge pill variant="light" class="[ admin-pill ]">
            {{ messages.length }}
          </b-badge>
        </h3>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <div v-if="loading"><h1>Loading...</h1></div>
      <!--- CARDS --->

      <b-card
        v-for="(item, i) in messages"
        :key="i"
        tag="article"
        class="[ card-hotel ][ m-4 ]"
      >
        <b-card-title>
          <b>{{ item.clientName }}</b>
        </b-card-title>

        <b-card-sub-title>
          {{ item.email }}
        </b-card-sub-title>

        <b-card-body>
          <b class="[ card-text-bold ]">Message:</b>
          <p>
            {{ item.message }}
          </p>
          <div class="[ mt-5 mb-2 ][ text-center ]">
            <b-button variant="primary" type="button"
              ><a
                :href="
                  'mailto:' +
                    item.email +
                    '?subject=Holidaze%20Contact&body=' +
                    item.message
                "
                class="[ card-button ]"
                >Reply message</a
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
const apiURL = "http://doristef.me/semester4/FinalProject/server/contact.json"; // API to fetch from
const apiConfig = {
  headers: { "Content-Type": "application/json" },
  responseType: "json",
  AccessControlAllowOrigin: "https://doristef.me"
};

export default {
  name: "messages",
  data() {
    return {
      loading: true,
      /* messages */
      messages: [],
      errors: []
    };
  },

  methods: {
    // API CALL
    apiCall: function() {
      axios
        .get(corsURL + apiURL, apiConfig)
        .then(({ data }) => {
          this.messages = data;
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
