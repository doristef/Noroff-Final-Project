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
    <b-row align-h="center">
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
  props: ["establishments"],
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
