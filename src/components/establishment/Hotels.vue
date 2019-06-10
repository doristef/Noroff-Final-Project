<template>
  <b-container class="[ mt-2 ]">
    <b-row align-h="center">
      <b-col align-self="center" class="[ my-1 ][ text-center ]">
        <b-dropdown text="Sort Establishments By : " variant="secondary">
          <b-dropdown-item @click="changeSortKey('establishmentName')">
            <a href="#" id="establishmentName"
              >Name
              <font-awesome-icon
                icon="check"
                size="1x"
                class="[ mr-2 ]"
                v-if="sortKey === 'establishmentName'"
              />
            </a>
          </b-dropdown-item>
          <b-dropdown-item @click="changeSortKey('price')">
            <a href="#" id="price"
              >Price
              <font-awesome-icon
                icon="check"
                size="1x"
                class="[ mr-2 ]"
                v-if="sortKey === 'price'"
              />
            </a>
          </b-dropdown-item>
          <b-dropdown-item @click="changeSortKey('maxGuests')">
            <a href="#" id="maxGuests"
              >Max. Guests
              <font-awesome-icon
                icon="check"
                size="1x"
                class="[ mr-2 ]"
                v-if="sortKey === 'maxGuests'"
              />
            </a>
          </b-dropdown-item>

          <b-dropdown-divider></b-dropdown-divider>

          <b-dropdown-item @click="changeSortDir('asc')">
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
          <b-dropdown-item @click="changeSortDir('desc')">
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
      <!--- CARDS --->
      <b-card
        no-body
        bg-variant="transparent"
        v-for="establishment in sortBy"
        :key="establishment.id"
        tag="article"
        class="[ card-hotel ][ mx-2 my-4 ]"
      >
        <router-link :to="'/accomodations/' + establishment.id">
          <img
            :src="establishment.imageUrl"
            :alt="establishment.establishmentName"
            class="[ card-img card-img-top ]"
          />

          <b-card-title
            class="[ ml-2 my-3 ][ card-hotel-header card-hotel-header-link ]"
          >
            {{ establishment.establishmentName }}
          </b-card-title>
        </router-link>

        <b-card-sub-title class="[ ml-3 my-2 ]">
          <a :href="'mailto:' + establishment.establishmentEmail">{{
            establishment.establishmentEmail
          }}</a>
        </b-card-sub-title>

        <b-card-body class="[ ml-2 my-2 ][ text-center ]">
          <b-button
            variant="primary"
            @click="
              $router.push('/accomodations/' + establishment.id + '/book/')
            "
            >Check Availability
          </b-button>
        </b-card-body>
        <template slot="footer">
          <font-awesome-icon icon="user-alt" size="lg" class="[ ml-2 mr-2 ]" />
          <span class="[ card-footer-text ]">{{
            establishment.maxGuests
          }}</span>

          <div class="[ float-right ][ mr-2 ]">
            <font-awesome-icon icon="dollar-sign" size="lg" class="[ mr-2 ]" />
            <span class="[ card-footer-text ]">{{ establishment.price }}</span>
          </div>
        </template>
      </b-card>
      <!--- CARDS END -->
    </b-row>
  </b-container>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "establishments",
  components: { FontAwesomeIcon },
  props: ["establishments"],
  data() {
    return {
      sortKey: "establishmentName",
      sortDir: "asc"
    };
  },
  computed: {
    // SortBy for Enquiries
    sortBy: function() {
      // eslint-disable-next-line
        return _.orderBy(
        this.establishments,
        function(item) {
          if (this.sortKey === "price" || this.sortKey === "maxGuests") {
            return parseInt(item[this.sortKey]);
          } else {
            return item[this.sortKey].toLowerCase();
          }
        }.bind(this),
        this.sortDir
      );
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
    }
  }
};
</script>
