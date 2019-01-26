<template>
  <v-layout row>
    <list-view
      v-if="categoriesLoaded"
      :Title="'Categories'"
      :items="list.Data"
      @onCreate="onCreate"
      @onUpdate="onUpdate"
      @onDelete="onDelete"
      :Create="list.Create"
      :Update="list.Update"
      :Delete="list.Delete"
    >
      <template slot-scope="slotProps">
        <v-card
          :color="slotProps.item.Color"
          hover
          class="category-card"
          @click.native="chooseCategory(slotProps.item)"
        >
          <v-img
            class="category-image"
            :src="'http://localhost:8100/api/file/get?fileid=' +  slotProps.item.FileID"
          ></v-img>
          <v-card-title class="category-title" primary-title>
            <div>
              <div class="headline caterogy-header">{{slotProps.item.Title}}</div>
              <span
                class="gray--text"
              >{{slotProps.item.Description || 'some item description in future comes here'}}</span>
            </div>
          </v-card-title>
        </v-card>
      </template>
    </list-view>
    <v-progress-linear v-else :indeterminate="true"></v-progress-linear>
    <category-form
      :model="createModel"
      dialogTitle="Create category"
      @close="actionVisible.Create = false"
      :show="actionVisible.Create"
    ></category-form>
  </v-layout>
</template>

<script>
import CategoryForm from '~/Components/CategoryForm'
import ListView from '~/components/ListView.vue'
export default {
  components: { CategoryForm, ListView },
  data() {
    return {
      actionVisible: { Create: false, Update: false, Delete: false },
      createModel: { Title: '', ImageID: null },
      categoriesLoaded: false,
    }
  },
  computed: {
    list() {
      return this.$store.state.categories.categories
    },
  },
  methods: {
    getActiveDialog(dialogName) {
      var action = this.menuActions.filter(item => item.title === dialogName)
      if (action) return action[0].active
      return false
    },
    switchDialog(dialogName, show) {
      var action = this.menuActions.filter(item => item.title === dialogName)
      this.menuActions[this.menuActions.indexOf(action[0])].active = show
    },
    onCreate() {
      this.actionVisible.Create = true
    },
    onUpdate(e) {},
    onDelete(e) {},
    chooseCategory(e) {
      console.log(e)
    },
  },
  mounted() {
    var that = this
    this.$store.dispatch('categories/getCategories').then(function() {
      that.categoriesLoaded = true
    })
  },
}
</script>

<style lang="scss">
.card-wrap {
  padding: 0.5rem;
}
.headline,
.category-header {
  text-transform: uppercase;
}
.category-title {
  padding-top: 0.8rem;
  padding-bottom: 0.7rem;
}
.category-card {
  padding-top: 0.8rem;
  background-color: lighten(red, 50%);
}
.category-image {
  height: 200px;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
</style>

