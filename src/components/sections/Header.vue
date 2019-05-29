<template>
  <b-container fluid class="[ header ]">
    <b-container class="[ vh100 ]">
      <!--- SEARCH --->
      <b-row class="[ vh100 ][ justify-content-center ]" align-v="center">
        <b-col align-self="center">
          <b-form
            @submit.prevent="onSubmit"
            class="[ search ]"
            autocomplete="off"
          >
            <b-form-group
              id="search"
              label-for="search"
              aria-describedby="search-helper"
              class="[ mb-0 ]"
            >
              <b-form-input
                autocomplete="off"
                id="search"
                type="text"
                size="lg"
                placeholder="Search"
                v-model="search"
                list="establishments"
                tabindex="1"
              />
              <datalist
                id="establishments"
                class="[ form-control ][ search-dropdown ]"
                v-if="search && filteredSearch.length"
              >
                <option
                  :tabindex="2 + i"
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
                Hotel: Sunset Beach,<br />
                Max price: 120
              </b-form-text>
            </b-form-group>
            <div class="[ search-button ]">
              <b-button
                size="lg"
                type="submit"
                variant="primary"
                class="[ search-button ]"
                @click="onSubmit"
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
      search: null
    };
  },
  computed: {
    filteredSearch() {
      return this.establishments.filter(item => {
        return (
          item.establishmentName
            .toLowerCase()
            .match(this.search.toLowerCase()) ||
          parseInt(item.price) <= this.search
        );
      });
    }
  },

  methods: {
    onSubmit() {
      this.$router.push("/accomodations/search/" + this.search);
      this.$emit("searchEstablishment", this.search);
    }
  }
};
</script>
