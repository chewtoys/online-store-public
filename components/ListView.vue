<template>
  <v-layout row>
    <v-card width="100%" max-height="100%">
      <v-card-title class="layout-card">
        <span class="headline">{{Title}}</span>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="searchString"
          append-icon="search"
          @click:append="onSearch"
          @click:append-outer="onClear"
          append-outer-icon="clear"
          placeholder="search..."
        ></v-text-field>
        <v-spacer></v-spacer>

        <v-btn v-if="Create" fab small dark color="white" @click="$emit('onCreate')">
          <v-icon color="black">add</v-icon>
        </v-btn>
      </v-card-title>
      <slot name="listPrepend"></slot>
      <v-container fluid class="items-container">
        <v-layout row wrap v-if="dataLoaded">
          <v-flex
            xs12
            md6
            lg4
            v-for="item in items"
            :key="item.ID"
            class="card-wrap"
            @contextmenu="show($event, item)"
          >
            <slot v-bind:item="item"></slot>
          </v-flex>
        </v-layout>
        <div class="preloader" v-else>
          <v-progress-circular indeterminate></v-progress-circular>
        </div>
        <div class="paging">
          Pages: {{page}} of {{totalPages}}
          <v-btn icon @click="$emit('onPrevPage')" :disabled="page == 1">
            <v-icon>navigate_before</v-icon>
          </v-btn>
          <v-btn icon @click="$emit('onNextPage')" :disabled="page == totalPages">
            <v-icon>navigate_next</v-icon>
          </v-btn>
          <v-spacer/>
          Total: {{totalItems}}
        </div>
      </v-container>
    </v-card>
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
    totalPages: { type: Number, default: 0 },
    page: { type: Number, default: 0 },
    totalItems: { type: Number, default: 0 },
    dataLoaded: { type: Boolean, default: false },
  },
  data() {
    return {
      showMenu: false,
      x: 0,
      y: 0,
      categoriesLoaded: false,
      searchString: '',
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
      this.$emit(`on${e.title}`, e)
    },
    show(e, item) {
      e.preventDefault()
      this.$emit('setEditing', item)
      this.showMenu = false
      this.x = e.clientX
      this.y = e.clientY
      this.$nextTick(() => {
        this.showMenu = true
      })
    },
    onSearch(reset) {
      this.$emit('onSearch', this.searchString)
    },
    onClear(reset) {
      this.searchString = ''
      this.$emit('onSearch', this.searchString)
    },
  },
  mounted() {},
}
</script>
<style lang="scss" scoped>
.items-container {
  min-height: calc(100vh - 14.3rem);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.layout-card {
  background: #e8e8e8;
  padding: 0.5rem;
  .headline {
    padding-left: 0.4rem;
  }
}
.paging {
  display: flex;
  background: #e8e8e8;
  align-items: center;
  padding-left: 1.2rem;
  padding-right: 1.2rem;
  border-radius: 0.2rem;
  margin: 0.5rem;
}
.preloader {
  display: flex;
  flex-grow: 1;
  align-items: center;
  flex-direction: column;
  height: 100%;
  justify-content: center;
}
</style>
