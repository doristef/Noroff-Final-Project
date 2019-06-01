<template>
  <b-container align-h="center" class="[ my-5 ]">
    <b-row>
      <b-button
        variant="outline-primary"
        class="[ mt-2 ml-3 ml-md-1 ]"
        @click="$router.go(-1)"
        >Back</b-button
      >
    </b-row>

    <b-row align-h="center">
      <b-col
        cols="12"
        md="10"
        align-h="center"
        v-for="establishment in filteredId"
        :key="establishment.id"
      >
        <b-row align-h="around">
          <b-col cols="12" class="[ text-center ][ p-2 ][ card-bg-gray ]">
            <img
              :src="establishment.imageUrl"
              :alt="establishment.establishmentName"
              style="max-width: 100%;"
            />
          </b-col>
        </b-row>
        <b-row align-h="around">
          <b-col cols="12" md="6" class="[ text-left ][ p-2 ]">
            <h1>{{ establishment.establishmentName }}</h1>
          </b-col>
          <b-col
            cols="12"
            md="4"
            class="[ p-2 mt-2 mb-4 mb-md-2 ][ text-md-left ]"
          >
            <div class="[ text-center ]">
              <b-button
                variant="primary"
                @click="$router.push($route.fullPath + '/book/')"
                >Check Availability
              </b-button>
            </div>
          </b-col>
        </b-row>
        <b-row align-h="around">
          <b-col cols="12" md="6" class="[ text-left ]">
            <h3>Description</h3>
            <p>
              {{ establishment.description }}
            </p>
            <h3>Self Catering</h3>
            <p v-if="establishment.selfCatering">
              This establishment offers self catering.
            </p>
            <p v-else>
              Unfortunately this establishment does not offers self catering.
            </p>
            <h3>Location</h3>
            <div>
              <Location
                :latitude="establishment.googleLat"
                :longitude="establishment.googleLong"
              />
            </div>
          </b-col>
          <b-col
            cols="12"
            md="4"
            class="[ p-2 mt-2 ][ text-center text-md-left ]"
          >
            <div
              class="[ my-2 mx-3 mx-md-1  ][ text-center ][ d-inline d-md-block ]"
            >
              <font-awesome-icon icon="user-alt" size="2x" class="[ mr-2 ]" />
              <span class="[ card-footer-text ][ my-1 ]">
                <b class="[ card-text-bold card-text-bold-bigger ]">{{
                  establishment.maxGuests
                }}</b>
              </span>
            </div>
            <div
              class="[ my-2 mx-3 mx-md-1  ][ text-center ][ d-inline d-md-block ]"
            >
              <font-awesome-icon
                icon="dollar-sign"
                size="2x"
                class="[ mr-2 ]"
              />
              <span class="[ card-footer-text ][ my-1 ]">
                <b class="[ card-text-bold card-text-bold-bigger ]">{{
                  establishment.price
                }}</b>
              </span>
            </div>
            <div
              class="[ my-2 mx-3 mx-md-1 ][ text-center ][ d-inline d-md-block ]"
              v-if="establishment.selfCatering"
            >
              <font-awesome-icon icon="utensils" size="2x" class="[ mr-2 ]" />
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Location from "./../establishment/HotelLocation.vue";

export default {
  name: "establishments",
  components: { FontAwesomeIcon, Location },
  props: ["establishments"],
  computed: {
    filteredId() {
      return this.establishments.filter(e => e.id === this.$route.params.id);
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  padding-bottom: 150px;
}
</style>
