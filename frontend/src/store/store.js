import Vue from "vue";
import Vuex from "vuex";
import VueJwtDecode from "vue-jwt-decode";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    userData: {
      loggedIn: false,
      username: ""
    },
    productData: {
      arrData: []
    }
  },
  mutations: {
    logIn(state, data) {
      window.localStorage.setItem("token", data.data.access_token);
      state.userData.loggedIn = true;
      const result = VueJwtDecode.decode(data.data.access_token);
      const expirationDate = new Date(result.exp * 1000);
      state.userData.username = result.identity;
      window.localStorage.setItem("token", result.identity);
      window.localStorage.setItem("token_exp", expirationDate);
    },
    logOut(state, vm) {
      state.userData.loggedIn = false;
      window.localStorage.clear();
      vm.$router.push("/login");
    },
    tryAutoLogin(state, vm) {
      const token = window.localStorage.getItem("token");
      if (!token) {
        return;
      }
      const expirationDate = window.localStorage.getItem("token_exp");
      const now = new Date();
      if (now >= expirationDate) {
        return;
      }
      console.log(token);
      state.userData.loggedIn = true;
      state.userData.username = token;
      vm.$router.push("/dashboard");
    },
    buyItem(state, item) {
      state.productData.arrData.push(item);
    }
  }
});
