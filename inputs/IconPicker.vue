<template>
  <v-layout class="wrap">
    <v-flex class="part text">
      <v-autocomplete
        v-model="local"
        :label="label"
        :items="icons"
        @change="$emit('change', local)"
      >
        <template slot="item" slot-scope="{ item }">
          <v-list-tile-content class="row-container">
            <v-list-tile-title v-html="item"></v-list-tile-title>
            <v-icon v-html="item"/>
          </v-list-tile-content>
        </template>
      </v-autocomplete>
    </v-flex>
    <v-flex class="part">
      <v-icon>{{local}}</v-icon>
    </v-flex>
  </v-layout>
</template>
<script>
import icons from '~/assets/js/icons'
export default {
  props: {
    label: { type: String, default: 'Icon' },
    model: { type: String, default: '' },
  },
  data() {
    return {
      icons: icons,
      local: '',
    }
  },
  methods: {},
  watch: {
    model(val) {
      this.local = val
    },
  },
  mounted() {
    console.log('iconpicker mounted', this.model)
  },
}
</script>
<style lang="scss" scoped>
.row-container {
  flex-direction: row !important;
  align-items: center;
}
.wrap {
  align-items: center;
  .part {
    flex-grow: 0;
  }

  .part.text {
    margin-left: 0.1rem;
    margin-right: 0.3rem;
  }
}
</style>



