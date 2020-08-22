import Vue from "vue";
import Vuex from "vuex";
import VueJwtDecode from "vue-jwt-decode";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    userData: {
      loggedIn: false,
      username: "",
      expiredate: ""
    }
  },
  mutations: {
    logIn(state, data) {
      window.localStorage.setItem("token", data.data.access_token);
      state.userData.loggedIn = true;
      const result = VueJwtDecode.decode(data.data.access_token);
      console.log(result);
      const expirationDate = result.exp;
      const d = new Date(expirationDate);
      console.log(expirationDate);
      console.log(d);
      state.userData.username = result.identity;
      window.localStorage.setItem("token", result.identity);
      window.localStorage.setItem("token_exp", expirationDate);
    }
  }
});
