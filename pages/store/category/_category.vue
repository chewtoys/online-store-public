<template>
  <v-layout column>
    <list-view
      v-if="listDataLoaded"
      :Title="categoryTitle"
      :items="list.Data"
      @onCreate="onCreate"
      @onUpdate="onUpdate"
      @onDelete="onDelete"
      :Create="list.create"
      :Update="list.update"
      :Delete="list.delete"
      @setEditing="setEditing"
    >
      <template slot="listPrepend">
        <v-layout row class="category-container">
          <v-flex xs6 class="image-container">
            <v-img
              contain
              height="25rem"
              class="full-category-image"
              :src="$axios.getImg(categoryImg)"
            />
          </v-flex>
          <v-flex xs6>{{category.Description}}</v-flex>
        </v-layout>
      </template>
      <template slot-scope="slotProps">
        <v-card
          :color="slotProps.item.Color"
          hover
          class="category-card"
          @click.native="chooseCategory(slotProps.item)"
        >
          <v-img class="category-image" :src="$axios.getImg(slotProps.item.ImageID)"></v-img>
          <v-card-title class="category-title" primary-title>
            <div>
              <div class="headline caterogy-header">{{slotProps.item.Title}}</div>
              <span
                class="gray--text"
              >{{slotProps.item.Description ? slotProps.item.Description.substring(0, 120) + '...' : 'no description provided for this subcategory'}}</span>
            </div>
          </v-card-title>
        </v-card>
      </template>
    </list-view>
    <v-progress-linear v-else :indeterminate="true"></v-progress-linear>
    <l-form
      :dialogTitle="actionVisible.Create ? 'Create subcategory' : 'Update subcategory'"
      :model="formModel"
      :show="actionVisible.Create || actionVisible.Update"
      :fields="formFields"
      :requestInProgress="requestInProgress"
      @fileChange="onFileChange($event)"
      @submit="onSubmit($event)"
      @close="actionVisible.Create = actionVisible.Update = false"
    />
    <confirm-dialog
      :show="actionVisible.Delete"
      title="Are you sure?"
      text="This action will delete category and all nested items will become uncategorized."
      v-on:cancel="actionVisible.Delete = false"
      v-on:confirm="onDeleteCategory"
    ></confirm-dialog>
  </v-layout>
</template>

<script>
import Form from '~/Components/Form'
import ConfirmDialog from '~/Components/ConfirmDialog'
import ListView from '~/components/ListView.vue'
export default {
  components: { 'l-form': Form, ListView, ConfirmDialog },
  data() {
    return {
      actionVisible: { Create: false, Update: false, Delete: false },
      formModel: {
        Title: '',
        Description: '',
        ImageID: null,
        Image: null,
        CategoryID: this.$route.params.category,
      },
      formFields: [
        { _id: 0, label: 'Title', prop: 'Title', component: 'v-text-field' },
        {
          _id: 1,
          label: 'Description',
          prop: 'Description',
          component: 'v-textarea',
        },
        { _id: 2, label: 'Image', prop: 'ImageID', component: 'file-input' },
      ],
      listDataLoaded: false,
      editingItem: null,
      requestInProgress: false,
    }
  },
  computed: {
    categoryTitle() {
      return this.category ? this.category.Title || '' : ''
    },
    categoryImg() {
      return this.category ? this.category.ImageID || '' : ''
    },
    category() {
      return this.$store.state.navigation.category
    },
    list() {
      return this.$store.state.subcategories.subcategories
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
    setEditing(item) {
      this.editingItem = item
    },
    onCreate() {
      this.actionVisible.Create = true
    },
    onUpdate(e) {
      this.actionVisible.Update = true
      Object.assign(this.formModel, this.editingItem)
    },
    onDelete(e) {
      this.actionVisible.Delete = true
    },
    onDeleteCategory() {
      this.$store
        .dispatch('subcategories/delete', this.editingItem.ID)
        .then(() => {
          this.actionVisible.Delete = false
        })
    },
    chooseCategory(e) {
      console.log(e)
    },
    onFileChange(e) {
      this.formModel.Image = e
    },
    onSubmit(e) {
      this.requestInProgress = true
      this.formModel.Title = e.Title
      this.formModel.Description = e.Description
      if (this.actionVisible.Create) this.updateCategory(true)
      else this.updateCategory(false)
    },
    async updateCategory(isNew) {
      var that = this
      var saveImgPromise = this.formModel.Image
        ? this.$axios.postFile('file/upload', this.formModel.Image)
        : new Promise(resolve => {
            resolve(0)
          })
      try {
        var imageUploadResult = await saveImgPromise
      } catch (e) {
        console.error(e)
        this.$store.commit('snackbar/show', {
          message: 'An error has occured while uploading image: ' + e.Message,
          btnColor: 'red',
        })
        this.requestInProgress = false
        return
      }
      this.formModel.ImageID = imageUploadResult.data || null
      var path = isNew ? 'subcategories/create' : 'subcategories/update'
      try {
        await this.$store.dispatch(path, this.formModel)
        this.$store.commit('snackbar/show', {
          message: this.actionVisible.Create
            ? `Category created successfully`
            : 'Category updated successfully',
          btnColor: 'green',
        })
        this.actionVisible.Create = this.actionVisible.Update = false
      } catch (e) {
        console.error(e)
        this.$store.commit('snackbar/show', {
          message: 'An error has occured while processing: ' + e.Message,
          btnColor: 'red',
        })
      } finally {
        this.requestInProgress = false
      }
    },
  },
  mounted() {
    // this.category = this.$store.state.navigation.category
    if (!this.category) {
      this.$store.dispatch('categories/getByID', this.$route.params.category)
    }
    var that = this
    this.$store
      .dispatch('subcategories/getAll', this.$route.params.category)
      .then(function() {
        that.listDataLoaded = true
      })
  },
}
</script>

<style lang="scss">
.category-container {
  padding: 2rem;
  .image-container {
    padding-right: 2rem;
  }
  .full-category-image {
    width: 100%;
  }
}
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

