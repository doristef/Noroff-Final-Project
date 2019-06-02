<template>
  <b-container class="[ my-5 ][ vh100 ]">
    <b-row align-h="center" class="[ my-2 ]">
      <b-col cols="12" md="6" class="[ my-2 ]">
        <h1 class="[ thankyou-heading ][ mt-2 mt-md-4 ]">Thank You!</h1>
      </b-col>
    </b-row>
    <b-row align-h="center" class="[ my-2 ]">
      <b-col cols="10" md="4">
        <p>
          Your request has been registered and you can expect a reply in
          <strong class="[ thankyou-bold ]">1-4 business days</strong>.
        </p>
      </b-col>
    </b-row>
    <b-row align-h="center" class="[ my-2 ]">
      <b-col cols="10" md="6" class="[ text-center ]">
        <router-link to="/accomodations/">
          <b-button variant="primary"> Browse More! </b-button>
        </router-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "thankyou"
};
</script>
