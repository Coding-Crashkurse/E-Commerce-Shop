<template>
  <v-app>
    <navbar />

    <v-main>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: {
    navbar: Navbar
  },
  mounted() {
    const token = window.localStorage.getItem("token");
    const result = this.$jwtDec(token);
    console.log(token);
    console.log(result);
  },
  data: () => ({
    //
  })
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
