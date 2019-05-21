<template>
  <b-container fluid>
    <!--- Holidaze --->
    <b-row
      class="[ justify-content-center ][ my-5 ]"
      align-v="center"
      align-h="around"
    >
      <b-col align-self="center" col cols="12" lg="5">
        <b-container>
          <h1 class="[ frontpage-h1 ]">Holidaze</h1>

          <p>
            A local tourism agency located in Bergen, aiming to help visitors of
            Norway to find great accommodation.
          </p>
        </b-container>
      </b-col>

      <b-col
        align-self="center"
        col
        cols="12"
        lg="3"
        class="[ icon-container ]"
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
