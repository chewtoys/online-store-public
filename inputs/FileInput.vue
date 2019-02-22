<template>
  <v-layout column class="input-wrap">
    <v-img v-if="_src" height="150" contain :src="_src"></v-img>
    <div class="input-alt" v-else>select image</div>
    <v-btn @click="onUploadClick">Upload</v-btn>
    <input type="file" :accept="accept" ref="fileInput" @change="onFileChange">
  </v-layout>
</template>

<script>
export default {
  props: {
    fileGuid: '',
    accept: {
      type: String,
      default: 'image/*',
    },
  },
  data() {
    return {
      src: '',
      file: null,
    }
  },
  computed: {
    _src() {
      if (this.src) return this.src
      if (this.fileGuid) return this.$axios.getImg(this.fileGuid)
    },
  },
  mounted() {
    if (this.fileGuid) this.src = this.$axios.getImg(this.fileGuid)
  },
  methods: {
    getFormData(files) {
      const forms = []
      for (const file of files) {
        const form = new FormData()
        form.append('data', file, file.name)
        forms.push(form)
      }
      return forms
    },
    onUploadClick() {
      if (!this.disabled) {
        this.$refs.fileInput.click()
      }
    },
    onFileChange($event) {
      const files = $event.target.files || $event.dataTransfer.files
      if (!files || !files.length) return
      var file = files[0]
      if (!file) return
      // TODO: if not image - snackbar error
      this.createImage(file)
      this.file = file
      this.$emit('fileChange', this.file)
    },
    createImage(file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        this.src = reader.result
      }
      reader.readAsDataURL(file)
    },
  },
}
</script>

<style scoped>
.input-alt {
  height: 150px;
  text-align: center;
  padding-top: 5rem;
  text-transform: uppercase;
}
.input-wrap {
  width: 15rem;
  background-color: #e3e3e3;
  padding: 0.2rem;
}
.image-preview {
  height: 15rem;
}
input[type='file'] {
  position: absolute;
  left: -99999px;
}
</style>