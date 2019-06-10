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
          <b-dropdown-item @click="changeSortKey('establishment')">
            <a href="#" id="establishment"
              >Establishment
              <font-awesome-icon
                icon="check"
                size="1x"
                class="[ mr-2 ]"
                v-if="sortKey === 'establishment'"
              />
            </a>
          </b-dropdown-item>
          <b-dropdown-item @click="changeSortKey('clientName')">
            <a href="#" id="clientName"
              >Client Name
              <font-awesome-icon
                icon="check"
                size="1x"
                class="[ mr-2 ]"
                v-if="sortKey === 'clientName'"
              />
            </a>
          </b-dropdown-item>

          <b-dropdown-divider
            v-if="sortKey !== 'newest' && sortKey !== 'oldest'"
          ></b-dropdown-divider>

          <b-dropdown-item
            @click="changeSortDir('asc')"
            v-if="sortKey !== 'newest' && sortKey !== 'oldest'"
          >
            <a href="#" id="asc"
              >Asc
              <font-awesome-icon
                icon="check"
                size="1x"
                class="[ mr-2 ]"
                v-if="sortDir === 'asc'"
              />
            </a>
          </b-dropdown-item>
          <b-dropdown-item
            @click="changeSortDir('desc')"
            v-if="sortKey !== 'newest' && sortKey !== 'oldest'"
          >
            <a href="#" id="desc"
              >Desc
              <font-awesome-icon
                icon="check"
                size="1x"
                class="[ mr-2 ]"
                v-if="sortDir === 'desc'"
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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
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
  components: { FontAwesomeIcon },
  data() {
    return {
      loading: true,
      /* Enquiries */
      enquiries: [],
      errors: [],
      sortKey: "newest",
      sortDir: "asc"
    };
  },
  computed: {
    // SortBy for Enquiries
    sortBy: function() {
      if (this.sortKey === "newest") {
        return this.enquiries.slice().reverse();
      } else if (this.sortKey === "oldest") {
        return this.enquiries;
      } else {
        // eslint-disable-next-line
        return _.orderBy(
          this.enquiries,
          function(item) {
            return item[this.sortKey].toLowerCase();
          }.bind(this),
          this.sortDir
        );
      }
    }
  },
  methods: {
    // Change Sort Direction
    changeSortDir: function(dir) {
      return (this.sortDir = dir);
    },
    // Change Sort Key
    changeSortKey: function(key) {
      return (this.sortKey = key);
    },
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
