<template>
  <v-col cols="3">
    <v-card class="mx-auto" max-width="400">
      <v-img class="white--text align-end" height="200px" :src="require(`@/assets/${link}`)">
        <v-card-title>{{title}}</v-card-title>
      </v-img>

      <v-card-text class="text--primary">
        <div>{{price}}$</div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="#229495" text @click="addItem">Add to cart</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>


<script>
export default {
  props: ["title", "price", "link"],
  methods: {
    addItem() {
      this.$store.commit({
        title: this.title,
        price: this.price,
        link: this.link
      });
    }
  }
};
</script>