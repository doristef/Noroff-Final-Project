<template>
  <b-container class="[ mt-2 ][ vh100 ]">
    <b-row>
      <b-button
        variant="outline-primary"
        class="[ mt-2 ]"
        @click="$router.go(-1)"
        >Back</b-button
      >
    </b-row>
    <b-row
      align-h="center"
      v-if="!filteredSearch.length || this.search === null"
    >
      <b-col cols="12" md="4">
        <h2>No match</h2>
        <p v-if="this.search !== null">
          Nothing found that matches search string: <br />
        </p>
        <p v-else>No search typed!</p>
        <h4
          class="[ card-text-bold ][ mt-4 mb-3 ml-4 ]"
          v-if="this.search !== null"
        >
          {{ this.$route.params.search }}
        </h4>
      </b-col>
    </b-row>
    <b-row align-h="center" v-else>
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
          class="[ card-hotel ][ m-4 ]"
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
    </b-row>
  </b-container>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "establishmentSearch",
  components: { FontAwesomeIcon },
  props: ["establishments", "search"],
  computed: {
    filteredSearch() {
      return this.establishments.filter(item => {
        return (
          item.establishmentName
            .toLowerCase()
            .match(this.$route.params.search.toLowerCase()) ||
          parseInt(item.price) <= this.$route.params.search
        );
      });
    }
  }
};
</script>
