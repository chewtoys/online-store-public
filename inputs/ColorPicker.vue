<template>
  <v-layout row justify-center>
    <v-flex xs12>
      <v-text-field @click="showPicker = true" readonly v-model="textValue" label="Choose color">
        <v-icon
          @click="showPicker = true"
          :color="textValue"
          slot="append-outer"
        >fiber_manual_record</v-icon>
      </v-text-field>
    </v-flex>
    <v-dialog v-model="showPicker" persistent max-width="500px">
      <v-layout row justify-center>
        <color-picker style="margin:1rem;padding:0.5rem" @input="onColorChoose" v-model="picker"/>
      </v-layout>
    </v-dialog>
  </v-layout>
</template>

<script>
import { Compact } from 'vue-color'
export default {
  components: {
    'color-picker': Compact,
  },
  props: {
    show: Boolean,
    dialogTitle: String,
    model: Object,
  },
  data: () => ({
    picker: {
      hex: '#194d33',
      hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
      hsv: { h: 150, s: 0.66, v: 0.3, a: 1 },
      rgba: { r: 25, g: 77, b: 51, a: 1 },
      a: 1,
    },
    showPicker: false,
    textValue: '',
  }),
  methods: {
    onColorChoose(e) {
      this.textValue = e.hex
      this.showPicker = false
      this.$emit(
        'input',
        `rgba(${this.picker.rgba.r}, ${this.picker.rgba.g}, ${
          this.picker.rgba.b
        }, 0.5 )`
      )
    },
  },
}
</script>
<style lang="css">
</style>
