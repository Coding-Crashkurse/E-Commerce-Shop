import Vue from "vue";
import Vuex from "vuex";
import VueJwtDecode from "vue-jwt-decode";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loggedIn: false,
    username: ""
  },
  mutations: {
    logIn(state, data) {
      state.loggedIn = data;
      const token = window.localStorage.getItem("token");
      const result = VueJwtDecode.decode(token);
      state.username = result;
    }
  }
});
