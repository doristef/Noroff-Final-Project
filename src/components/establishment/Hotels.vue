<template>
  <b-container class="[ mt-2 ]">
    <b-row align-h="center">
      <!--- CARDS --->
      <b-card
        no-body
        bg-variant="transparent"
        v-for="establishment in establishments"
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
  props: ["establishments"]
};
</script>
