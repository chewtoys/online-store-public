<template>
  <v-layout row>
    <list-view
      :Title="'Categories'"
      :items="list.Data"
      :totalItems="list.Total"
      :totalPages="list.TotalPages"
      :page="list.Page"
      :dataLoaded="categoriesLoaded"
      @onCreate="onCreate"
      @onUpdate="onUpdate"
      @onDelete="onDelete"
      @onSearch="onSearch"
      @onPrevPage="onPrevPage"
      @onNextPage="onNextPage"
      :Create="list.Create"
      :Update="list.Update"
      :Delete="list.Delete"
      @setEditing="setEditing"
    >
      <template slot-scope="slotProps">
        <v-card hover class="category-card" @click.native="chooseCategory(slotProps.item)">
          <v-img contain class="category-image" :src="$axios.getImg(slotProps.item.ImageID)"></v-img>
          <v-card-title class="category-title" primary-title>
            <div>
              <div class="headline caterogy-header">{{slotProps.item.Title}}</div>
              <span
                class="gray--text"
              >{{slotProps.item.Description ? slotProps.item.Description.substring(0, 120) + '...' : 'no description provided for this category'}}</span>
            </div>
          </v-card-title>
        </v-card>
      </template>
    </list-view>
    <l-form
      :dialogTitle="actionVisible.Create ? 'Create category' : 'Update category'"
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
        Icon: 'computer',
        Link: '',
      },
      formFields: [
        { _id: 0, label: 'Title', prop: 'Title', component: 'v-text-field' },
        { _id: 1, label: 'Link', prop: 'Link', component: 'v-text-field' },
        { _id: 2, label: 'Icon', prop: 'Icon', component: 'icon-picker' },
        {
          _id: 3,
          label: 'Description',
          prop: 'Description',
          component: 'v-textarea',
        },
        { _id: 4, label: 'Image', prop: 'ImageID', component: 'file-input' },
      ],
      categoriesLoaded: false,
      editingItem: null,
      requestInProgress: false,
      queryFilter: {
        page: 1,
        search: '',
        pageSize: 6,
      },
    }
  },
  computed: {
    list() {
      return this.$store.state.categories.categories
    },
  },
  methods: {
    _setDefaultFormModel() {
      this.formModel = {
        Title: '',
        Description: '',
        Link: '',
        ImageID: null,
        Image: null,
      }
    },
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
      this._setDefaultFormModel()
      this.actionVisible.Create = true
    },
    onUpdate(e) {
      this.actionVisible.Update = true
      Object.assign(this.formModel, this.editingItem)
    },
    onDelete(e) {
      this.actionVisible.Delete = true
    },
    async onSearch(searchStr) {
      this.queryFilter.search = searchStr
      await this.requestData()
    },
    async onPrevPage(e) {
      if (this.queryFilter.page == 1) return
      this.queryFilter.page--
      await this.requestData()
    },
    async requestData() {
      this.categoriesLoaded = false
      await this.$store.dispatch('categories/getCategories', this.queryFilter)
      this.queryFilter.page = this.list.Page
      this.categoriesLoaded = true
    },
    async onNextPage(e) {
      if (this.queryFilter.page == this.list.TotalPages) return
      this.queryFilter.page++
      await this.requestData()
    },
    onDeleteCategory() {
      this.$store
        .dispatch('categories/delete', this.editingItem.ID)
        .then(() => {
          this.actionVisible.Delete = false
        })
    },
    chooseCategory(e) {
      this.$store.commit('navigation/setState', { category: e })
      this.$router.push(`/store/${e.Link}`)
    },
    onFileChange(e) {
      this.formModel.Image = e
    },
    onSubmit(e) {
      this.requestInProgress = true
      this.formFields.forEach(item => {
        this.formModel[item['prop']] = e[item['prop']]
      })
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
      var path = isNew ? 'categories/create' : 'categories/update'
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
    var that = this
    this.$store
      .dispatch('categories/getCategories', this.queryFilter)
      .then(function() {
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
  display: flex;
  padding-bottom: 0.7rem;
  background: lighten(gray, 48%);
}
.category-card {
  padding-top: 0.8rem;
}
.category-image {
  height: 200px;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>

