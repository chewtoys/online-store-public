<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <h2>Categories</h2>
      </div>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-flex d-flex md2>
            <v-card color="green lighten-2" dark>
              <v-card-text>{{ lorem.slice(0, 90) }}</v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex md2>
            <v-card color="green lighten-2" dark>
              <v-card-text>{{ lorem.slice(0, 90) }}</v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex md2>
            <v-card color="green lighten-2" dark>
              <v-card-text>{{ lorem.slice(0, 90) }}</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthForm from "~/Components/AuthForm";
export default {
  components: { AuthForm },
  data() {
    return {
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
    };
  },
  computed: {
    list() {
      return this.$store.state.data.categories;
    }
  },
  methods: {},
  mounted() {
    this.$store.dispatch("categories/getCategories");
  }
};
</script>
