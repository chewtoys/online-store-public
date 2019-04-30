<template>
  <dialog-form
    :show="show"
    :dialogTitle="dialogTitle"
    @submit="submit"
    @cancel="$emit('close')"
    :requestInProgress="requestInProgress"
  >
    <v-form v-model="formValid" ref="form" class="form">
      <v-flex xs12 v-for="field in fields" :key="field._id">
        <component
          :is="field.component"
          :label="field.label"
          :rules="getValidationRule(field.rule)"
          v-model="localData[field.prop]"
          :style="field.component == 'file-input' ? 'width:100%' : ''"
          :fileGuid="field.component == 'file-input' ? localData[field.prop] : undefined"
          :auto-grow="field.component == 'v-textarea' ? true : undefined"
          :model="field.component == 'icon-picker' ? localData[field.prop] : undefined"
          @fileChange="onFileChange($event)"
        ></component>
      </v-flex>
    </v-form>
  </dialog-form>
</template>

<script>
import FileInput from '~/inputs/FileInput'
import IconPicker from '~/inputs/IconPicker'
import DialogForm from '~/Components/DialogForm.vue'

export default {
  components: {
    FileInput,
    IconPicker,
    DialogForm,
  },
  props: {
    fields: Array,
    model: Object,
    show: Boolean,
    dialogTitle: String,
    requestInProgress: Boolean,
  },
  data: () => ({
    fileChanged: false,
    localData: {},
    formValid: true,
  }),
  methods: {
    onFileChange(e) {
      this.$emit('fileChange', e)
    },
    submit() {
      if (!this.$refs.form.validate()) return
      this.$emit('submit', this.localData)
    },
    getValidationRule(ruleProp) {
      if (!ruleProp) return []
      if (!(typeof ruleProp === 'string'))
        throw 'Rule must me a string specified in form.vue'
      switch (ruleProp) {
        case 'required':
          return [v => !!v || 'This field is required']
          break
        default:
          return []
      }
    },
  },
  watch: {
    show(oldVal, val) {
      this.localData = {}
      Object.assign(this.localData, this.model)
      this.$refs.form.resetValidation()
    },
  },
  mounted() {
    console.log('form mounted')
  },
}
</script>
<style lang="scss" scoped>
.form-container {
  padding-top: 0;
}
.form {
  width: 100%;
}
.form-title {
  font-weight: 400;
  font-size: 16px;
}
</style>
