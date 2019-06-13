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
      <b-col align-self="center" class="[ my-1 ][ text-center ]">
        <b-dropdown text="Sort By" variant="secondary">
          <b-dropdown-item @click="changeSortKey('oldest')">
            <a href="#" id="oldest"
              >Oldest First
              <font-awesome-icon
                icon="check"
                size="1x"
                class="[ mr-2 ]"
                v-if="sortKey === 'oldest'"
              />
            </a>
          </b-dropdown-item>
          <b-dropdown-item @click="changeSortKey('newest')">
            <a href="#" id="newest"
              >Newest First
              <font-awesome-icon
                icon="check"
                size="1x"
                class="[ mr-2 ]"
                v-if="sortKey === 'newest'"
              />
            </a>
          </b-dropdown-item>
        </b-dropdown>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <div v-if="loading"><h1>Loading...</h1></div>
      <!--- CARDS --->

      <b-card
        v-for="(item, i) in sortBy"
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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* Axios and apiUrl */
import axios from "axios";
import { URL, corsURL } from "./../../../server.config";
const apiURL = corsURL + URL + "contact.json"; // API to fetch from

const apiConfig = {
  headers: { "Content-Type": "application/json" },
  responseType: "json",
  AccessControlAllowOrigin: "https://doristef.me"
};

export default {
  name: "messages",
  components: { FontAwesomeIcon },
  data() {
    return {
      loading: true,
      /* messages */
      messages: [],
      errors: [],
      sortKey: "newest"
    };
  },
  computed: {
    // SortBy for Messages
    sortBy: function() {
      if (this.sortKey === "newest") {
        return this.messages.slice().reverse();
      } else {
        return this.messages;
      }
    }
  },
  methods: {
    // Change Sort Key
    changeSortKey: function(key) {
      return (this.sortKey = key);
    },
    // API CALL
    apiCall: function() {
      axios
        .get(apiURL, apiConfig)
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
