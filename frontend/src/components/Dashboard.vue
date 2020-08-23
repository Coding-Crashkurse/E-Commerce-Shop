<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" id="history">
        <h3>
          Hello
          <strong>{{this.username}}</strong>
          , you made {{this.history.length}} purchases in the past:
        </h3>
        <v-spacer></v-spacer>
        <v-btn @click="logOut">Log out</v-btn>
        <table id="customers">
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Purchase Date</th>
          </tr>
          <tr v-for="(item, index) in history" :key="index">
            <td>{{item.item}}</td>
            <td>{{item.price}}</td>
            <td>{{item.date}}</td>
          </tr>
        </table>
        <h3>{{totalPrice}}</h3>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  mounted() {
    this.username = this.$store.state.userData.username;
    this.$store.commit("getPurchases", this.username);
  },
  data: () => ({
    username: "",
    history: [
      { item: "PC", price: 129.99, date: new Date() },
      { item: "Laptop xyz", price: 129.99, date: new Date() },
      { item: "Samsung Galaxy S8", price: 129.99, date: new Date() },
      { item: "IPad Pro", price: 129.99, date: new Date() },
      { item: "PC", price: 89.99, date: new Date() },
      { item: "MacBook Mini", price: 599.99, date: new Date() }
    ]
  }),
  computed: {
    totalPrice() {
      const total = this.history.reduce(function(acc, obj) {
        return acc + obj.price;
      }, 0);
      return `Total spendings ${total} $`;
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
</style>
