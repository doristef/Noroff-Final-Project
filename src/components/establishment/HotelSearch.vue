<template>
  <b-container class="[ mt-2 ][ vh100 ]">
    <b-row>
      <b-button
        variant="outline-primary"
        class="[ my-5 my-md-2 ml-3 ml-md-1 ]"
        @click="$router.go(-1)"
        >Back</b-button
      >
    </b-row>
    <b-row>
      <b-col>
        <Search
          :establishments="this.establishments"
          :button="false"
          :predict="false"
          :description="true"
          :placeholder="this.search"
        />
      </b-col>
    </b-row>
    <b-row align-h="center">
      <b-col cols="12" md="4">
        <p v-if="this.search === null">No search typed!</p>
        <p v-if="this.search !== null && this.filteredSearch.length < 1">
          Nothing found that matches search string: <br />
        </p>

        <div class="[ mt-4 mb-3 ml-4 ]">
          <p class="[ d-inline-block ]">Search String:</p>
          <h4
            class="[ d-inline-block ][ card-text-bold ][ ml-3 ]"
            v-if="this.$route.params.search === 'null'"
          >
            Nothing
          </h4>
          <h4
            class="[ d-inline-block ][ card-text-bold ][ ml-3 ]"
            v-else-if="this.search === ''"
          >
            {{ this.$route.params.search }}
          </h4>
          <h4 class="[ d-inline-block ][ card-text-bold ][ ml-3 ]" v-else>
            {{ this.search }}
          </h4>
        </div>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <b-col cols="12" md="4" class="[ mb-3 ]">
        <!--- CARDS --->
        <router-link
          v-for="establishment in filteredSearch"
          :key="establishment.id"
          :to="'/accomodations/' + establishment.id"
        >
          <b-card
            :title="establishment.establishmentName"
            :img-src="establishment.imageUrl"
            :img-alt="establishment.establishmentName"
            img-top
            tag="article"
            class="[ card-hotel ][ my-2 ]"
          >
            <b-card-sub-title>
              {{ establishment.establishmentEmail }}
            </b-card-sub-title>

            <template slot="footer">
              <font-awesome-icon
                icon="user-alt"
                size="lg"
                class="[ ml-2 mr-2 ]"
              />
              <span class="[ card-footer-text ]">{{
                establishment.maxGuests
              }}</span>

              <div class="[ float-right ][ mr-2 ]">
                <font-awesome-icon
                  icon="dollar-sign"
                  size="lg"
                  class="[ mr-2 ]"
                />
                <span class="[ card-footer-text ]">{{
                  establishment.price
                }}</span>
              </div>
            </template>
          </b-card>
        </router-link>
        <!--- CARDS END -->
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Search from "./../sections/Search.vue";
import { mapState } from "vuex";

export default {
  name: "establishmentSearch",
  components: { FontAwesomeIcon, Search },
  props: ["establishments"],
  data() {
    return {
      searchRoute: this.$route.params.search
    };
  },
  computed: {
    filteredSearch() {
      var search;
      if (this.search === "") {
        search = this.searchRoute;
      } else {
        search = this.search;
      }
      return this.establishments.filter(item => {
        return (
          item.establishmentName.toLowerCase().match(search.toLowerCase()) ||
          parseInt(item.price) <= this.search
        );
      });
    },
    // MAPSTATE
    ...mapState(["search"])
  }
};
</script>
