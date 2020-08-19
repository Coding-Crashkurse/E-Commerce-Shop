<template>
  <div>
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
                  <v-list-item-subtitle>Network Engineer</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-img>
      </v-card>
    </template>
  </div>
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
    username: ""
  })
};
</script>
