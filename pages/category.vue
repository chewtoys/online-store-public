<template>
<v-layout row>
    <v-flex xs12>
      <v-card max-height="100%">
        <v-card-title class="blue white--text">
          <span class="headline">Categories</span>
          <v-spacer></v-spacer>
          <!-- <v-menu v-if="isAdmin" bottom left> -->
          <v-menu bottom left>
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
                @click="switchDialog(item.title, true)"
              >
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-card-title>

        <v-card-text>Lorem Ipsum</v-card-text>
      </v-card>
    </v-flex>
    <category-form :model="createModel" dialogTitle="Create category" @close="switchDialog('Create', false)" :show="getActiveDialog('Create')"></category-form>
  </v-layout>
</template>

<script>
import CategoryForm from "~/Components/CategoryForm";
export default {
  components: { CategoryForm },
  data() {
    return {
      menuActions: [{title: 'Create', active: false}, {title: 'Edit', active: false}, {title: 'Delete', active: false}],
      createModel:{Title: "", ImageID: null}
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
    getActiveDialog(dialogName){
      var action = this.menuActions.filter((item) => item.title === dialogName);
      if(action) return action[0].active;
      return false;
    },
    switchDialog(dialogName, show){
      var action = this.menuActions.filter((item) => item.title === dialogName);
      this.menuActions[this.menuActions.indexOf(action[0])].active = show;
    }
  },
  mounted() {
    this.$store.dispatch("categories/getCategories");
  }
};
</script>
