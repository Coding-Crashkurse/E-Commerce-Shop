<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" id="history" v-if="this.$store.state.productData.purchases.length > 0">
        <h3>You made {{this.$store.state.productData.purchases.length}} purchases in the past:</h3>
        <v-spacer></v-spacer>

        <table id="customers">
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Purchase Date</th>
          </tr>
          <tr v-for="(item, index) in history.data" :key="index">
            <td>{{item.item}}</td>
            <td>{{item.price}}</td>
            <td>{{item.created_date}}</td>
          </tr>
        </table>
        <h3>{{totalPrice}}</h3>
      </v-col>
      <v-col v-else>
        <h3>No purchases done yet!</h3>
      </v-col>
    </v-row>
    <v-btn @click="logOut" id="logoutbtn" large>Log out</v-btn>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  mounted() {
    this.username = this.$store.state.userData.username;
    this.$store.commit("getPurchases", this.username);
  },
  data: () => ({
    username: ""
    // history: [
    //   { item: "PC", price: 129.99, date: new Date() },
    //   { item: "Laptop xyz", price: 129.99, date: new Date() },
    //   { item: "Samsung Galaxy S8", price: 129.99, date: new Date() },
    //   { item: "IPad Pro", price: 129.99, date: new Date() },
    //   { item: "PC", price: 89.99, date: new Date() },
    //   { item: "MacBook Mini", price: 599.99, date: new Date() }
    // ]
  }),
  computed: {
    totalPrice() {
      const total = this.$store.state.productData.purchases.reduce(function(
        acc,
        obj
      ) {
        return acc + parseFloat(obj.price);
      },
      0);
      return `Total spendings ${Math.round(total, 2)} $`;
    },
    ...mapState(["getPurchases"]),
    history() {
      console.log(this.$store.state.productData.purchases);
      return {
        data: this.$store.state.productData.purchases
      };
    }
  },
  methods: {
    logOut() {
      this.$store.commit("logOut", this);
    }
  }
};
</script>

<style scoped>
#customers {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin: 15px 0px;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
  width: 33.33%;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #229495;
  color: white;
}

#logoutbtn {
  float: right;
}
</style>
