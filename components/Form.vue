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
