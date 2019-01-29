<template>
  <dialog-form
    :show="show"
    :dialogTitle="dialogTitle"
    @submit="submit"
    @cancel="$emit('close')"
    :requestInProgress="requestInProgress"
  >
    <v-flex xs12>
      <v-text-field v-model="category.Title" label="Title" required></v-text-field>
    </v-flex>
    <v-flex xs12>
      <file-input
        :value="category.FileName"
        :required="true"
        @formData="onFileChange"
        label="Choose file..."
      />
    </v-flex>
    <v-flex xs12>
      <color-picker v-on:input="onColorChange"/>
    </v-flex>
  </dialog-form>
</template>

<script>
import FileInput from '~/inputs/FileInput'
import DialogForm from '~/Components/DialogForm.vue'
import ColorPicker from '~/inputs/ColorPicker'

export default {
  components: {
    FileInput,
    ColorPicker,
    DialogForm,
  },
  props: {
    show: Boolean,
    dialogTitle: String,
    objModel: Object,
    isNew: Boolean,
  },
  data: () => ({
    fileChanged: false,
    requestInProgress: false,
    picker: {
      hex: '#194d33',
      hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
      hsv: { h: 150, s: 0.66, v: 0.3, a: 1 },
      rgba: { r: 25, g: 77, b: 51, a: 1 },
      a: 1,
    },
    category: {
      Title: '',
      Image: null,
      ImageID: null,
      RowVersion: '',
      Color: '',
      ID: 0,
    },
  }),
  methods: {
    onFileChange(e) {
      this.category.Image = e[0].get('data')
      this.fileChanged = true
    },
    onColorChange: function(colorString) {
      this.category.Color = colorString
    },
    create() {
      var that = this
      this.$axios
        .postFile('file/upload', this.category.Image)
        .then(function(uploadResult) {
          that.category.ImageID = uploadResult.data
          that.$store.dispatch('categories/create', {
            Title: that.category.Title,
            ImageID: that.category.ImageID,
            Color: that.category.Color,
          })
          that.$emit('close')
        })
    },
    update() {
      var that = this
      if (this.fileChanged)
        var promise = this.$axios.postFile('file/upload', this.category.Image)
      if (promise)
        promise.then(function(uploadResult) {
          that.category.ImageID = uploadResult.data
          that.$store
            .dispatch('categories/update', {
              ID: that.category.ID,
              Title: that.category.Title,
              ImageID: that.category.ImageID,
              Color: that.category.Color,
              RowVersion: that.category.RowVersion,
            })
            .then(() => that.$emit('close'))
        })
      else
        this.$store
          .dispatch('categories/update', {
            ID: that.category.ID,
            Title: that.category.Title,
            ImageID: that.category.ImageID,
            Color: that.category.Color,
            RowVersion: that.category.RowVersion,
          })
          .then(() => that.$emit('close'))
    },
    submit() {
      if (this.isNew) this.create()
      else this.update()
    },
  },
  watch: {
    show(oldVal, val) {
      this.category = {}
      Object.assign(this.category, this.objModel)
    },
  },
  mounted() {},
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
