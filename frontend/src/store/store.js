import Vue from "vue";
import Vuex from "vuex";
import VueJwtDecode from "vue-jwt-decode";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    userData: {
      loggedIn: false,
      username: ""
    }
  },
  mutations: {
    logIn(state, data) {
      window.localStorage.setItem("token", data.data.access_token);
      state.userData.loggedIn = true;
      const result = VueJwtDecode.decode(data.data.access_token);
      const expirationDate = new Date(result.exp * 1000);
      state.userData.username = result.identity;
      window.localStorage.setItem("token", result);
      window.localStorage.setItem("token_exp", expirationDate);
    },
    tryAutoLogin(state) {
      console.log("Trying auto login...");
      const token = window.localStorage.getItem("token");
      if (!token) {
        return;
      }
      const expirationDate = window.localStorage.getItem("token_exp");
      const now = new Date();
      if (now >= expirationDate) {
        return;
      }
      state.userData.loggedIn = true;
      state.userData.username = token.identity;
      // desired: this.$router.push("/dashboard")
    }
  }
});
