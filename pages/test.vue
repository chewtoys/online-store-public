<template>
  <icon-picker :model="icon"></icon-picker>
</template>
<script>
import IconPicker from '~/inputs/IconPicker.vue'
export default {
  data() {
    return {
      icon: 'computer',
    }
  },
  methods: {},
  components: { IconPicker },
}
</script>