<template>
  <b-container fluid>
    <!--- Holidaze --->
    <b-row class="[ my-5 ]" align-h="center">
      <b-col col cols="12" lg="5" xl="4" style="max-width: 650px;">
        <b-container>
          <h1 class="[ frontpage-h1 ]">Holidaze</h1>
          <p>
            A local tourism agency located in Bergen, aiming to help visitors of
            Norway to find great accommodation.
          </p>
          <p>
            Holidaze was founded in 2015 by two locals in Bergen, Norway. Their
            aim is to get more people to Norway and especially Bergen, and
            experience beautiful nature along with outgoing friendly Norwegians.
          </p>
          <p>
            We hope to see you soon!
          </p>
        </b-container>
      </b-col>

      <b-col
        align-self="center"
        col
        cols="12"
        md="10"
        lg="5"
        xl="4"
        class="[ icon-container ]"
        style="max-width: 500px;"
      >
        <b-container>
          <b-row align-v="center">
            <span class="[ icon icon-suitcase ]" />
            <p class="[ ml-5 ][ icon-text ]">
              Plan your vacation in the comfort of your own home.
            </p>
          </b-row>
          <b-row align-v="center">
            <span class="[ icon icon-money ]" />
            <p class="[ ml-5 ][ icon-text ]">
              Save money, Find the best accommodation for reasonable price.
            </p>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
    <!--- Icons END --->
  </b-container>
</template>

<script>
export default {
  name: "frontpage"
};
</script>
