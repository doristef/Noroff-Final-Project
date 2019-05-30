import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    authenticated: false,
    search: "",
    filteredResults: []
  },
  mutations: {
    changeState(state) {
      state.authenticated = !state.authenticated;
    },
    searchString(state, search) {
      state.search = search;
    },
    filteredResults(state, search) {
      state.filteredResults = search;
    }
  },
  actions: {
    change({ commit }) {
      commit("changeState");
    },
    search({ commit }, value) {
      commit("searchString", value);
    },
    filter({ commit }, value) {
      commit("filteredResults", value);
    }
  }
});
export default store;
