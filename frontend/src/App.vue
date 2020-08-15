<template>
  <v-app>
    <navbar />

    <v-main></v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "App",

  components: {
    navbar: Navbar
  },

  data: () => ({
    //
  })
};
</script>
