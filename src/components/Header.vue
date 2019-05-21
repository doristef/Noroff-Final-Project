<template>
  <div class="[ container-fluid ][ header ]">
    <b-container class="[ vh100 ]">
      <!--- SEARCH --->
      <b-row class="[ vh100 ][ justify-content-center ]" align-v="center">
        <b-col align-self="center">
          <b-form @submit.prevent="onSubmit" class="[ search ]">
            <b-form-group
              id="search"
              label-for="search"
              :formatter="format"
              aria-describedby="search-helper"
              class="[ mb-0 ]"
            >
              <b-form-input
                id="searchArticles"
                v-model="articleSearch"
                type="text"
                size="lg"
                placeholder="Search"
              />
              <b-form-text id="search-helper" class="[ search-helper ]">
                Example: Bergen, Norway
              </b-form-text>
            </b-form-group>
            <div class="[ search-button ]">
              <b-button
                pill
                size="lg"
                type="submit"
                variant="primary"
                class="[ search-button ]"
                >Search Destination</b-button
              >
            </div>
          </b-form>
        </b-col>
      </b-row>
      <!--- SEARCH END --->
    </b-container>
  </div>
  <!-- container -->
</template>

<script>
export default {
  name: "header",
  data: () => ({}),
  methods: {}
};
</script>
