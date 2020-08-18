import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import { routes } from "./routes";
import VueJwtDecode from "vue-jwt-decode";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueJwtDecode);

const router = new VueRouter({
  routes: routes
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");
