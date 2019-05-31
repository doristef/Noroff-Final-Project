<template>
  <b-container>
    <!--- SEARCH --->
    <b-row
      class="[ justify-content-center ]"
      :class="rowClass"
      align-v="center"
    >
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
            <b-form-text slot="description" v-if="description">
              - You can search by name or price.
            </b-form-text>
            <b-form-input
              autocomplete="off"
              id="search"
              type="text"
              size="lg"
              :placeholder="placeholder"
              v-model="search"
              @input="onChange"
              list="establishments"
              tabindex="1"
            />
            <div
              id="establishments"
              class="[ form-control ][ search-dropdown ]"
              v-if="predict && this.search && this.filteredSearch.length"
            >
              <router-link
                :to="'/accomodations/' + item.id"
                v-for="(item, i) in filteredSearch"
                :key="i"
              >
                <div :tabindex="2 + i" class="[ search-dropdown-link ][ my-2 ]">
                  {{ item.establishmentName }}
                </div>
              </router-link>
            </div>
          </b-form-group>
          <div class="[ search-button ][ mt-2 ]">
            <b-button
              size="lg"
              type="submit"
              variant="primary"
              class="[ search-button ]"
              @click="onSubmit"
              v-if="button"
              :disabled="this.search === ''"
              >Search Destination</b-button
            >
          </div>
        </b-form>
      </b-col>
    </b-row>
    <!--- SEARCH END ---> </b-container
  ><!-- container -->
</template>

<script>
export default {
  name: "search",
  props: [
    "establishments",
    "rowClass",
    "button",
    "predict",
    "description",
    "placeholder"
  ],
  data() {
    return {
      search: ""
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
      this.$router.push("/accomodations/search/" + this.search + "/");
    },
    onChange() {
      this.$store.commit("searchString", this.search);
      this.$store.commit("filteredResults", this.filteredSearch);
    }
  }
};
</script>
