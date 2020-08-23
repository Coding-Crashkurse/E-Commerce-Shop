import Vue from "vue";
import Vuex from "vuex";
import VueJwtDecode from "vue-jwt-decode";

Vue.use(Vuex);
import axios from "axios";

export const store = new Vuex.Store({
  state: {
    userData: {
      loggedIn: false,
      username: ""
    },
    productData: {
      arrData: [],
      purchases: []
    }
  },
  mutations: {
    logIn(state, data) {
      console.log(data.res);
      console.log(data.this);
      window.localStorage.setItem("token", data.res.data.access_token);
      state.userData.loggedIn = true;
      const result = VueJwtDecode.decode(data.res.data.access_token);
      const expirationDate = new Date(result.exp * 1000);
      state.userData.username = result.identity;
      window.localStorage.setItem("token", result.identity);
      window.localStorage.setItem("token_exp", expirationDate);
      data.this.$router.push("/dashboard");
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
      state.userData.loggedIn = true;
      state.userData.username = token;
      vm.$router.push("/dashboard");
    },
    buyItem(state, item) {
      state.productData.arrData.push(item);
      console.log(state.productData.arrData);
    },
    deleteItem(state, index) {
      state.productData.arrData.splice(index, 1);
    },
    confirmPurchase(state, vm) {
      axios
        .post("http://localhost:5000/sales", {
          username: state.userData.username,
          data: state.productData.arrData
        })
        .then(res => {
          console.log(res);
          vm.$router.push("/dashboard");
        })
        .catch(err => {
          console.log(err);
        });
    },
    getPurchases(state, id) {
      console.log("attached");
      axios
        .get(`http://localhost:5000/dashboardata/${id}`)
        .then(res => {
          console.log(res);
          state.productData.purchases = res.data.purchases;
          console.log(state.productData.purchases);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
