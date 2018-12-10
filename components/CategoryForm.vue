<template>
  <v-layout row justify-center>
    <v-dialog v-model="show" persistent max-width="500px">
      <v-card>
        <v-card-title class="form-title">{{dialogTitle}}</v-card-title>
        <v-card-text>
          <v-container grid-list-md class="form-container">
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="category.Title" label="Title" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <file-input :required="true" @formData="onFileChange" label="Choose file..."/>
              </v-flex>
              <v-flex xs12>
                <color-picker v-on:input="onColorChange"/>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="blue darken-1"
            :disabled="requestInProgress"
            flat
            @click.native="$emit('close')"
          >Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            :disabled="requestInProgress"
            flat
            @click.native="create"
          >Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import FileInput from '~/inputs/FileInput'
import ColorPicker from '~/inputs/ColorPicker'
export default {
  components: {
    FileInput,
    ColorPicker,
  },
  props: {
    show: Boolean,
    dialogTitle: String,
    model: Object,
  },
  data: () => ({
    dialog: false,
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
      Color: '',
    },
  }),
  methods: {
    onFileChange(e) {
      this.category.Image = e[0].get('data')
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
  },
  mounted() {
    Object.assign(this.category, this.model)
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
