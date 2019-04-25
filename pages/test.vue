<template>
  <v-card width="100%" height="100%">
    <v-card-title class="layout-card">
      <span class="headline">Title</span>
      <v-spacer></v-spacer>
      <v-text-field clearable placeholder="search..." style="width:0rem"></v-text-field>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn fab small dark color="white" @click="$emit('onCreate')">
        <v-icon color="black">add</v-icon>
      </v-btn>
    </v-card-title>
    <v-container fluid>content</v-container>
  </v-card>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {},
  components: {},
}
</script>