<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <img src="logo.svg" width="64">
        <h2>The best online store!</h2>
      </div>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex v-on:click="sendAuthedRequest" d-flex :class="testFlexPoint">
            <v-card color="purple" dark>
              <v-card-title primary class="title">Lorem</v-card-title>
              <v-card-text>Some text here... Some text here...Some text here...Some text here...Some text here...Some text here...</v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex xs12 sm6 md3>
            <v-layout row wrap>
              <v-flex d-flex>
                <v-card color="indigo" dark>
                  <v-card-text>{{ lorem.slice(0, 70) }}</v-card-text>
                </v-card>
              </v-flex>
              <v-flex d-flex>
                <v-layout row wrap>
                  <v-flex v-for="n in 2" :key="n" d-flex xs12>
                    <v-card color="red lighten-2" dark>
                      <v-card-text>{{ lorem.slice(0, 40) }}</v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex d-flex xs12 sm6 md2 child-flex>
            <v-card color="green lighten-2" dark>
              <v-card-text>{{ lorem.slice(0, 90) }}</v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex xs12 sm6 md3>
            <v-card color="blue lighten-2" dark>
              <v-card-text>{{ lorem.slice(0, 100) }}</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card>
        <v-card-title class="headline">Welcome to the Vuetify + Nuxt.js template</v-card-title>
        <v-card-text>
          <p>counter:{{counter}}</p>
          <v-btn @click="inc">Click!</v-btn>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat nuxt to="/inspire">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthForm from '~/Components/AuthForm'
export default {
  components: { AuthForm },
  data() {
    return {
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
      testFlexPoint: 'lg4',
    }
  },
  computed: {
    counter() {
      return this.$store.state.counter
    },
  },
  methods: {
    inc() {
      this.$store.commit('inc')
    },
    async sendAuthedRequest() {
      var ret = await this.$axios.get('account/test')
      console.log(ret)
    },
  },
  mounted() {},
}
</script>
