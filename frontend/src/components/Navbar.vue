<template>
  <v-card color="grey lighten-4" flat tile>
    <v-toolbar color="#229495" dark>
      <v-toolbar-title>Compu-Global-Hyper-Mega-Net</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-for="item in left_nav"
        :key="item.icon"
        :title="item.title"
        :to="item.to"
        text
      >{{ item.text }}</v-btn>
      <v-spacer></v-spacer>
      <v-btn text to="/dashboard" v-if="this.$store.state.userData.loggedIn">
        Dashboard
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn text to="/login" v-if="!this.$store.state.userData.loggedIn">
        Login
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn color="primary" dark to="/cart">
        Cart
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      left_nav: [
        { text: "Our Products", to: "/" }
        // { text: "Smartphones", to: "/smartphones" },
        // { text: "Notebooks", to: "/notebooks" }
      ]
    };
  }
};
</script>
<style></style>
