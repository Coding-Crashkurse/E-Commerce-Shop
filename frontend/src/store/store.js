import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loggedIn: false
  },
  mutations: {
    logIn(state, data) {
      state.loggedIn = data;
    }
  }
});