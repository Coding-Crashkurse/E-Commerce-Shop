<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <template>
          <v-card class="mx-auto" max-width="420" tile>
            <v-img
              height="100%"
              src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
            >
              <v-row align="end" class="fill-height">
                <v-col align-self="start" class="pa-0" cols="12">
                  <v-avatar class="profile" color="grey" size="164" tile>
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
                    ></v-img>
                  </v-avatar>
                </v-col>
                <v-col class="py-0">
                  <v-list-item color="rgba(0, 0, 0, .4)" dark>
                    <v-list-item-content>
                      <v-list-item-title class="title">{{
                        username
                      }}</v-list-item-title>
                      <v-list-item-subtitle
                        >Network Engineer</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-img>
          </v-card>
        </template>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" id="history">
        <h3></h3>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";

export default {
  mounted() {
    const token = window.localStorage.getItem("token");
    const result = VueJwtDecode.decode(token);
    this.username = result.identity;
  },
  data: () => ({
    username: "",
    history: [
      { item: "PC", price: 129.99, date: new Date() },
      { item: "Laptop xyz", price: 129.99, date: new Date() },
      { item: "Samsung Galaxy S8", price: 129.99, date: new Date() },
      { item: "IPad Pro", price: 129.99, date: new Date() },
      { item: "PC", price: 89.99, date: new Date() }
    ]
  })
};
</script>

<style scoped>
#history {
  margin-top: 50px;
  text-align: center;
}
</style>
