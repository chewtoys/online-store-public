<template>
  <v-layout row justify-center>
    <v-dialog v-model="show" persistent max-width="500px">
      <v-tabs>
        <v-tab>
          Log In
        </v-tab>
        <v-tab-item>
          <v-card>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field v-model="loginForm.email" label="Email" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="loginForm.password" label="Password" type="password" required></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn color="blue darken-1" :disabled="requestInProgress" flat @click.native="$emit('close')">Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" :disabled="requestInProgress" flat @click.native="login">Submit
              </v-btn>
            </v-card-actions>
            </v-card>
        </v-tab-item>
        <v-tab>
          Register
        </v-tab>
        <v-tab-item>
          <v-card>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field v-model="registerForm.email" label="Email" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="registerForm.password" label="Password" type="password" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="registerForm.confirmPassword" label="Confirm password" type="password" required></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn color="blue darken-1" :disabled="requestInProgress" flat @click.native="$emit('close')">Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" :disabled="requestInProgress" flat @click.native="register">Submit</v-btn>
            </v-card-actions>
            </v-card>
        </v-tab-item>
      </v-tabs>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    show: Boolean
  },
  data: () => ({
    dialog: false,
    requestInProgress: false,
    loginForm: {
      email: "",
      password: ""
    },
    registerForm: {
      email: "",
      password: "",
      confirmPassword: ""
    }
  }),
  methods: {
    async login() {
      try {
        await this.$store.dispatch("account/logIn", {
          email: this.loginForm.email,
          password: this.loginForm.password
        });
        this.$emit("close");
        this.setDefaults();
      } catch (err) {
        this.$store.commit("snackbar/show", {
          message: `Authentication failed. (${err.response.data.error || err})`,
          btnColor: "red"
        });
      }
    },
    register() {
      this.$emit("close");
      this.setDefaults();
    },
    setDefaults() {
      this.registerForm.email = this.registerForm.password = this.registerForm.confirmPassword =
        "";
      this.loginForm.email = this.loginForm.password = "";
    }
  }
};
</script>