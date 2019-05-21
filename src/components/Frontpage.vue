<template>
  <b-container fluid>
    <!--- Holidaze --->
    <b-row class="[ justify-content-center ][ my-5 ]" align-v="center">
      <b-col align-self="center">
        <b-container>
          <h1 class="[ frontpage-h1 ]">Holidaze</h1>

          <p>
            A local tourist agency located in Bergen.
          </p>
        </b-container>
      </b-col>
    </b-row>
    <!--- Holidaze END --->
    <!--- Icons --->
    <b-row
      class="[ justify-content-center ][ frontpage-icons ]"
      align-v="center"
    >
      <b-col align-self="center">
        <b-container>
          <span class="[ icon-suitcase ]"> suitcase </span>
          <span class="[ icon-money ]"> money </span>

          <p>Something about suitcase</p>
          <p>Something about money</p>
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
