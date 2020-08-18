<template>
  <v-container>
    <v-row justify="center" class="mt-12">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-toolbar color="#229495" dark flat>
            <v-toolbar-title @click="toggleLogin" v-bind:class="loginClass"
              >Login</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-toolbar-title @click="toggleLogin" v-bind:class="registerClass"
              >Register</v-toolbar-title
            >
          </v-toolbar>
          <v-card-text v-if="login">
            <v-form>
              <v-text-field
                v-model="loginData.email"
                label="Login"
                name="login"
                prepend-icon="mdi-account"
                type="text"
              ></v-text-field>

              <v-text-field
                v-model="loginData.password"
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-text v-if="!login">
            <v-form>
              <v-text-field
                v-model="registerData.fullname"
                label="Fullname"
                name="fullname"
                prepend-icon="mdi-account"
                type="text"
              ></v-text-field>

              <v-text-field
                v-model="registerData.reg_email"
                id="reg_email"
                label="Email"
                name="email"
                prepend-icon="mdi-email"
                type="email"
              ></v-text-field>
              <v-text-field
                v-model="registerData.reg_username"
                id="reg_username "
                label="Username"
                name="username"
                prepend-icon="mdi-account-box"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="registerData.reg_password"
                id="reg_password"
                label="Password"
                name="reg_password"
                prepend-icon="mdi-lock"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="#229495" v-if="!login" dark @click="submitRegister"
              >Register</v-btn
            >
            <v-btn color="#229495" v-if="login" dark @click="submitLogin"
              >Login</v-btn
            >
          </v-card-actions>
          <div id="error_div" v-if="this.error">
            {{ errortxt }}
            <v-spacer></v-spacer>
            <v-btn color="white" v-if="activate_user_btn" @click="activateUser"
              >Activate user</v-btn
            >
          </div>
          <div id="success_div" v-if="this.success">{{ successtxt }}</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  props: {
    source: String
  },
  data() {
    return {
      left_nav: [
        { text: "All Products", to: "/" },
        { text: "Smartphones", to: "/smartphones" },
        { text: "Notebooks", to: "/notebooks" }
      ],
      login: true,
      registerData: {
        fullname: "",
        reg_email: "",
        reg_username: "",
        reg_password: ""
      },
      loginData: {
        email: "",
        password: ""
      },
      error: false,
      errortxt: "",
      success: false,
      successtxt: "",
      activate_user_btn: false
    };
  },
  methods: {
    toggleLogin() {
      this.login = !this.login;
      this.error = false;
      this.success = false;
    },
    submitRegister() {
      axios
        .post("http://localhost:5000/register", {
          fullname: this.registerData.fullname,
          email: this.registerData.reg_email,
          username: this.registerData.reg_username,
          password: this.registerData.reg_password
        })
        .then(res => {
          console.log(res);
          this.error = false;
          this.success = true;
          this.successtxt = "User successfully created";
        })
        .catch(err => {
          console.log(err);
          this.error = true;
          this.success = false;
          this.errortxt = err.response.data.message;
        });
    },
    submitLogin() {
      axios
        .post("http://localhost:5000/login", {
          email: this.loginData.email,
          password: this.loginData.password
        })
        .then(res => {
          console.log(res);
          this.error = false;
          this.success = true;
          this.successtxt = "Login successful";
          window.localStorage.setItem("token", res.data.access_token);
        })
        .catch(err => {
          console.log(err);
          this.error = true;
          this.success = false;
          this.errortxt = err.response.data.message;
          if (err.response.data.message === "User not activated") {
            this.activate_user_btn = true;
          } else {
            this.activate_user_btn = false;
          }
        });
    },
    activateUser() {
      axios
        .post("http://localhost:5000/confirm", {
          email: this.loginData.email
        })
        .then(res => {
          console.log(res);
          this.error = false;
          this.success = true;
          this.successtxt = "Mail sent successfully";
        })
        .catch(err => {
          console.log(err);
          this.error = true;
          this.success = false;
          this.errortxt = err.response.data.message;
        });
    }
  },
  computed: {
    loginClass() {
      return this.login ? "active" : "inactive";
    },
    registerClass() {
      return !this.login ? "active" : "inactive";
    }
  }
};
</script>

<style scoped>
.v-toolbar__title {
  padding: 7px 10px;
  cursor: pointer;
  transition: 0.3s all ease-in;
  border: 1.5px solid #229495;
  border-radius: 5px;
}

.active {
  background: white;
  color: #229495;
}

#error_div,
#success_div {
  color: white;
  padding: 7px 5px;
  display: block;
  width: 100%;
  text-align: center;
  margin-top: 15px;
}

#error_div {
  background: red;
}

#success_div {
  background: green;
}
</style>
