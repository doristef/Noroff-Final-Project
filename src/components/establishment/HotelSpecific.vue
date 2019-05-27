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
        class="[ text-center ]"
      >
        <b-row align-h="around">
          <b-col cols="12" md="10" class="[ text-left ][ p-2 ]">
            <img
              :src="establishment.imageUrl"
              alt="establishment.establishmentName"
              style="max-width: 100%;"
            />
          </b-col>
        </b-row>
        <b-row align-h="around">
          <b-col cols="12" md="4" class="[ text-left ][ p-2 ]">
            <h1>{{ establishment.establishmentName }}</h1>
          </b-col>
          <b-col
            cols="12"
            md="4"
            class="[ p-2 mt-2 mb-4 mb-md-2 ][ text-center text-md-left ]"
          >
            <b-button
              variant="primary"
              @click="$router.push($route.fullPath + '/book/')"
              >Check Availability
            </b-button>
          </b-col>
        </b-row>
        <b-row align-h="around">
          <b-col cols="12" md="4" class="[ text-left ]">
            <h3>Description</h3>
            <p>
              {{ establishment.description }}
            </p>
          </b-col>
          <b-col
            cols="12"
            md="4"
            class="[ p-2 mt-2 ][ text-center text-md-left ]"
          >
            <div class="[ my-2 ]">
              <font-awesome-icon icon="user-alt" size="lg" class="[ mr-2 ]" />
              <span class="[ card-footer-text ][ my-1 ]">{{
                establishment.maxGuests
              }}</span>
            </div>
            <div class="[ my-2 ]">
              <font-awesome-icon
                icon="dollar-sign"
                size="lg"
                class="[ mr-2 ]"
              />
              <span class="[ card-footer-text ][ my-1 ]">{{
                establishment.price
              }}</span>
            </div>
          </b-col>
        </b-row>
      </b-col>
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
<style lang="scss" scoped>
.container {
  padding-bottom: 150px;
}
</style>
