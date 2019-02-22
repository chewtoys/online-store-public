<template>
  <dialog-form
    :show="show"
    :dialogTitle="dialogTitle"
    @submit="submit"
    @cancel="$emit('close')"
    :requestInProgress="requestInProgress"
  >
    <v-flex xs12 v-for="field in fields" :key="field._id">
      <component
        :is="field.component"
        :label="field.label"
        v-model="localData[field.prop]"
        :style="field.component == 'file-input' ? 'width:100%' : ''"
        :fileGuid="field.component == 'file-input' ? localData[field.prop] : undefined"
        :auto-grow="field.component == 'v-textarea' ? true : undefined"
        @fileChange="onFileChange($event)"
      ></component>
    </v-flex>
  </dialog-form>
</template>

<script>
import FileInput from '~/inputs/FileInput'
import DialogForm from '~/Components/DialogForm.vue'

export default {
  components: {
    FileInput,
    DialogForm,
  },
  props: {
    fields: Array,
    model: Object,
    show: Boolean,
    dialogTitle: String,
    requestInProgress: Boolean,
    objModel: Object,
  },
  data: () => ({
    fileChanged: false,
    localData: {},
  }),
  methods: {
    onFileChange(e) {
      this.$emit('fileChange', e)
    },
    create() {
      // var that = this
      // this.$axios
      //   .postFile('file/upload', this.category.Image)
      //   .then(function(uploadResult) {
      //     that.category.ImageID = uploadResult.data
      //     that.$store.dispatch('categories/create', {
      //       Title: that.category.Title,
      //       Description: that.category.Description,
      //       ImageID: that.category.ImageID,
      //       Color: that.category.Color,
      //     })
      //     that.$emit('close')
      //   })
    },
    update() {
      // var that = this
      // if (this.fileChanged)
      //   var promise = this.$axios.postFile('file/upload', this.category.Image)
      // if (promise)
      //   promise.then(function(uploadResult) {
      //     that.category.ImageID = uploadResult.data
      //     that.$store
      //       .dispatch('categories/update', {
      //         ID: that.category.ID,
      //         Title: that.category.Title,
      //         Description: that.category.Description,
      //         ImageID: that.category.ImageID,
      //         Color: that.category.Color,
      //         RowVersion: that.category.RowVersion,
      //       })
      //       .then(() => that.$emit('close'))
      //   })
      // else
      //   this.$store
      //     .dispatch('categories/update', {
      //       ID: that.category.ID,
      //       Title: that.category.Title,
      //       Description: that.category.Description,
      //       ImageID: that.category.ImageID,
      //       Color: that.category.Color,
      //       RowVersion: that.category.RowVersion,
      //     })
      //     .then(() => that.$emit('close'))
    },
    submit() {
      this.$emit('submit', this.localData)
    },
  },
  watch: {
    show(oldVal, val) {
      this.localData = {}
      Object.assign(this.localData, this.model)
    },
  },
  mounted() {
    Object.assign(this.localData, this.model)
    console.log(this.fields)
  },
}
</script>
<style lang="css">
.form-container {
  padding-top: 0;
}
.form-title {
  font-weight: 400;
  font-size: 16px;
}
</style>
