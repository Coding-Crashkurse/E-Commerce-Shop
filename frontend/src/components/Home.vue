<template>
  <v-container>
    <v-row>
      <card
        v-for="(item, index) in carddata"
        :key="index"
        :title="item.title"
        :price="item.price"
        :link="item.link"
      ></card>
    </v-row>
    <h3>You have some items in your cart {{this.countData.data}}</h3>
  </v-container>
</template>

<script>
import Card from "./Card";
import { mapState } from "vuex";

export default {
  data: () => ({
    carddata: [
      { title: "Samsung Galaxy S8", price: 555.99, link: "samsung.jpeg" },
      { title: "Samsung Galaxy S10", price: 799.99, link: "samsung.jpeg" },
      { title: "Apple iPad", price: 350.99, link: "ipad.jpeg" },
      { title: "Apple iMac 5K", price: 1819.99, link: "imac.jpeg" },
      { title: "IPhone 11", price: 744.99, link: "ipad.jpeg" },
      { title: "Samsung Galaxy A20", price: 154.99, link: "samsung.jpeg" },
      { title: "Highend Gaming PC Ultra", price: 1899.99, link: "gaming.jpeg" },
      { title: "Monster Gaming I9", price: 2599.99, link: "gaming.jpeg" }
    ]
  }),
  components: {
    card: Card
  },
  computed: {
    ...mapState(["productData"]),
    countData() {
      return {
        data: "muh"
      };
    }
  }
};
</script>
