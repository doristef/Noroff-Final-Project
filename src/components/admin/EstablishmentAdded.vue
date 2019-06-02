<template>
  <b-container class="[ my-5 ][ vh100 ]">
    <b-row align-h="center" class="[ my-2 ]">
      <b-col cols="12" md="6" class="[ my-2 ]">
        <h1 class="[ thankyou-heading ][ mt-2 mt-md-4 ]">
          Establishment Added
        </h1>
      </b-col>
    </b-row>
    <b-row align-h="center" class="[ my-2 ]">
      <b-col cols="10" md="4">
        <p>
          A new establishment with the
          <strong class="[ thankyou-bold ]"
            >ID: {{ this.$route.params.id }}</strong
          >
          has been added.
        </p>
      </b-col>
    </b-row>
    <b-row align-h="center" class="[ my-2 ]">
      <b-col cols="10" md="6" class="[ text-center ]">
        <p>
          A link to the establishment will be available in about
          <strong class="[ thankyou-bold ]">15min</strong>.<br />
        </p>
        <p>
          <router-link :to="'/accomodations/' + this.$route.params.id">
            <strong class="[ thankyou-bold ]"
              >http://doristef.me/semester4/FinalProject/#/accomodations/{{
                this.$route.params.id
              }}</strong
            >
          </router-link>
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "thankyou"
};
</script>
