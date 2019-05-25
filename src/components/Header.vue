<template>
  <b-container fluid class="[ header ]">
    <b-container class="[ vh100 ]">
      <!--- SEARCH --->
      <b-row class="[ vh100 ][ justify-content-center ]" align-v="center">
        <b-col align-self="center">
          <b-form @submit.prevent="onSubmit" class="[ search ]">
            <b-form-group
              id="search"
              label-for="search"
              aria-describedby="search-helper"
              class="[ mb-0 ]"
            >
              <b-form-input
                id="search"
                type="text"
                size="lg"
                placeholder="Search"
                v-model="search"
                autocomplete="off"
                list="autocomplete"
                tabindex="1"
              />
              <datalist
                id="autocomplete"
                class="[ form-control ][ search-dropdown ]"
                v-if="search && filteredSearch.length"
              >
                <option
                  tabindex="2"
                  class="[ search-dropdown-item ]"
                  v-for="(item, i) in filteredSearch"
                  :key="i"
                >
                  <router-link :to="'/accomodations/' + item.id"
                    >{{ item.establishmentName }}
                  </router-link>
                </option>
              </datalist>
              <b-form-text id="search-helper" class="[ search-helper ]">
                Example: Bergen, Norway
              </b-form-text>
            </b-form-group>
            <div class="[ search-button ]">
              <b-button
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
    </b-container> </b-container
  ><!-- container -->
</template>

<script>
export default {
  name: "pageHeader",
  props: ["establishments"],
  data() {
    return {
      search: ""
    };
  },
  computed: {
    filteredSearch() {
      return this.establishments.filter(
        function(item) {
          return item.establishmentName
            .toLowerCase()
            .match(this.search.toLowerCase());
        }.bind(this)
      );
    }
  }
};
</script>
