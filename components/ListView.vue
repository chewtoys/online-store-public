<template>
  <v-layout row>
    <v-flex xs12>
      <v-card max-height="100%">
        <v-card-title class="blue white--text">
          <span class="headline">{{Title}}</span>
          <v-spacer></v-spacer>
          <!-- <v-menu v-if="isAdmin" bottom left> -->
          <v-btn v-if="Create">Create</v-btn>
        </v-card-title>
        <v-container fluid>
          <v-layout row wrap justify-space-between>
            <v-flex xs12 md6 lg4 v-for="item in items" :key="item.ID" class="card-wrap">
              <slot v-bind:item="item"></slot>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  props: {
    Title: { type: String },
    Create: { type: Boolean },
    Update: { type: Boolean },
    Delete: { type: Boolean },
    items: [],
  },
  data() {
    return {
      menuActions: [
        { title: 'Create', active: false },
        { title: 'Edit', active: false },
        { title: 'Delete', active: false },
      ],
      categoriesLoaded: false,
    }
  },
  computed: {},
  methods: {},
  mounted() {},
}
</script>