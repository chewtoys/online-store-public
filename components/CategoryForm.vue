<template>
  <v-layout row justify-center>
    <v-dialog v-model="show" persistent max-width="500px">
          <v-card>
            <v-card-title>
              {{dialogTitle}}
            </v-card-title>
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
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    show: Boolean,
    dialogTitle: String,
    model: Object 
  },
  data: () => ({
    dialog: false,
    requestInProgress: false,
    category: {
      Title: "",
      Image: null,
      ImageID: null
    },
  }),
  methods: {
  },
  mounted() {
    Object.assign(this.category, this.model);    
  },

};
</script>