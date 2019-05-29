import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    authenticated: false,
  },
  mutations: {
    changeState (state) {
      state.authenticated = !state.authenticated;
    }
  },
  actions: {
    change ({ commit }) {
      commit('changeState');
    }
  }
});

export default store;