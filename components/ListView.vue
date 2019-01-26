<template>
  <v-layout row>
    <v-flex xs12>
      <v-card max-height="100%">
        <v-card-title class="blue white--text">
          <span class="headline">{{Title}}</span>
          <v-spacer></v-spacer>
          <!-- <v-menu v-if="isAdmin" bottom left> -->
          <v-btn v-if="Create" fab small dark color="white" @click="$emit('onCreate')">
            <v-icon color="black">add</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex
              xs12
              md6
              lg4
              v-for="item in items"
              :key="item.ID"
              class="card-wrap"
              @contextmenu="show"
            >
              <slot v-bind:item="item"></slot>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
    <v-menu
      v-if="menuActionsAvailable"
      v-model="showMenu"
      :position-x="x"
      :position-y="y"
      absolute
      offset-y
      transition="slide-x-transition"
    >
      <v-list>
        <v-list-tile
          v-for="(item, index) in menuActions"
          :key="index"
          @click="executeMenuAction(item)"
        >
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-layout>
</template>
<script>
export default {
  props: {
    Title: { type: String },
    Create: { type: Boolean, default: false },
    Update: { type: Boolean, default: false },
    Delete: { type: Boolean, default: false },
    items: { type: Array, default: () => [] },
  },
  data() {
    return {
      showMenu: false,
      x: 0,
      y: 0,

      categoriesLoaded: false,
    }
  },
  computed: {
    menuActions() {
      let ret = []
      if (this.Update) ret.push({ title: 'Update', active: true })
      if (this.Delete) ret.push({ title: 'Delete', active: true })
      return ret
    },
    menuActionsAvailable() {
      return this.menuActions.some(a => a.active)
    },
  },
  methods: {
    executeMenuAction(e) {
      this.$emit(`on${e.title}`)
    },
    show(e) {
      e.preventDefault()
      this.showMenu = false
      this.x = e.clientX
      this.y = e.clientY
      this.$nextTick(() => {
        this.showMenu = true
      })
    },
  },
  mounted() {},
}
</script>