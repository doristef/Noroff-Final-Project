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
              v-if="this.search && this.filteredSearch.length"
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
          </b-form-group>
          <div class="[ search-button ][ mt-2 ]">
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
    <!--- SEARCH END ---> </b-container
  ><!-- container -->
</template>

<script>
export default {
  name: "search",
  props: ["establishments", "rowClass"],
  data() {
    return {
      search: null
    };
  },
  computed: {
    filteredSearch() {
      if (this.search !== null) {
        return this.establishments.filter(item => {
          return (
            item.establishmentName
              .toLowerCase()
              .match(this.search.toLowerCase()) ||
            parseInt(item.price) <= this.search
          );
        });
      } else {
        return this.establishments;
      }
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
