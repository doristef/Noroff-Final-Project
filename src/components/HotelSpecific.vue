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
      <b-card
        v-for="establishment in filteredId"
        :key="establishment.id"
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
  computed: {
    filteredId() {
      return this.establishments.filter(e => e.id === this.$route.params.id);
    }
  }
};
</script>
