<template>
  <v-container fluid>
    <div id="cartwrapper" v-if="countData.data.length > 0">
      <v-row>
        <v-col cols="12" id="history">
          <table id="customers">
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Image</th>
            </tr>
            <tr v-for="(item, index) in countData.data" :key="index">
              <td>{{item.title}}</td>
              <td>{{item.price}}</td>
              <td class="splitrow">
                <v-img
                  class="white--text align-end"
                  height="100px"
                  max-width="300px"
                  :src="require(`@/assets/${item.link}`)"
                ></v-img>
                <v-icon @click="deleteItem(index)">mdi-delete</v-icon>
              </td>
            </tr>
          </table>
          <div v-if="this.$store.state.userData.loggedIn">
            <h3>{{totalPrice}}</h3>
            <v-btn color="#229495" dark @click.stop="dialog = true" x-large>Checkout</v-btn>
          </div>
          <div v-else>
            <h3>Login first to buy items</h3>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline">Confirm Purchase</v-card-title>

            <v-card-text>Are you sure you want to make that purchase?</v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="green darken-1" text @click="confirm">Yes</v-btn>
              <v-btn color="red darken-1" text @click="dialog = false">No</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
    <div v-else>
      <h2>No items in your cart yet!</h2>
    </div>
  </v-container>
</template>



<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    deleteItem(index) {
      this.$store.commit("deleteItem", index);
    },
    confirm() {
      this.$store.commit("confirmPurchase", this);
    }
  },
  computed: {
    ...mapState(["productData"]),
    countData() {
      return {
        data: this.productData.arrData
      };
    },
    totalPrice() {
      const total = this.productData.arrData.reduce(function(acc, obj) {
        return acc + obj.price;
      }, 0);
      return `Total amount: ${Math.round(total)} $ for ${
        this.productData.arrData.length
      } items`;
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

.splitrow {
  display: flex;
  justify-content: space-between;
}

.v-icon.v-icon {
  font-size: 34px;
  color: darkred;
  cursor: pointer;
  transition: 0.25s all ease-in;
  margin-left: 50%;
}
</style>