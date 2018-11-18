<template>
<v-layout row>
    <v-flex xs12>
      <v-card max-height="100%">
        <v-card-title class="blue white--text">
          <span class="headline">Categories</span>
          <v-spacer></v-spacer>
          <v-menu v-if="isAdmin" bottom left>
            <v-btn
              slot="activator"
              dark
              icon
            >
              <v-icon>more_vert</v-icon>
            </v-btn>

            <v-list>
              <v-list-tile
                v-for="(item, i) in menuActions"
                :key="i"
                @click="menuActionClick(item.title)"
              >
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-card-title>

        <v-card-text>Lorem Ipsum</v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthForm from "~/Components/AuthForm";
export default {
  components: { AuthForm },
  data() {
    return {
      menuActions: [{title: 'Create'}, {title: 'Edit'}, {title: 'Delete'}]
    };
  },
  computed: {
    list() {
      return this.$store.state.data.categories;
    },
    isAdmin(){
      return this.$store.getters["account/isAdmin"]
    }

  },
  methods: {
    menuActionClick(item){
      switch(item.title) {
        
      }
    }
  },
  mounted() {
    this.$store.dispatch("categories/getCategories");
  }
};
</script>
