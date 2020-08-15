<template>
  <v-card color="grey lighten-4" flat tile>
    <v-toolbar color="#229495" dark>
      <v-toolbar-title>CompuNerds</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-for="item in left_nav" :key="item.icon" :title="item.title" text>{{ item.text }}</v-btn>
      <v-spacer></v-spacer>
      <v-btn text>
        Login
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn color="primary" dark>
        Cart
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
//import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  data() {
    return {
      left_nav: [
        { text: "All Products" },
        { text: "Smartphones" },
        { text: "Notebooks" }
      ]
    };
  }
};
</script>
<style>
</style>
