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
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs12 md6 lg4 v-for="item in list" :key="item">
              <v-card :color="item.Color">
                <v-img height="200px" :src="'http://localhost:8100/api/file/get?fileid=' +  item.FileID"></v-img>
                <v-card-title primary-title>
                  <div>
                    <div class="headline caterogy-header"> {{item.Title}} </div>
                    <span class="gray--text">{{item.Description || 'some item description in future comes here'}}</span>
                  </div>
                </v-card-title>  
              </v-card>  
            </v-flex>  
          </v-layout>  
        </v-container>
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
      createModel:{Title: "", ImageID: null},
      categoriesLoaded: false
    };
  },
  computed: {
    list() {
      return this.$store.state.categories.categories;
    },
    isAdmin(){
      return this.$store.getters["account/isAdmin"]
    },

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
    var that = this;
    this.$store.dispatch("categories/getCategories").then(function(){
      that.categoriesLoaded = true;
    });
  }
};
</script>

<style>
/* .caterogy-header{
  text-transform: uppercase;
  margin-bottom: 0.5rem;
} */
</style>

