<template>
  <list-view
    :Title="'Test items'"
    :items="list"
    @onCreate="onCreate"
    @onUpdate="onUpdate"
    :Create="true"
    :Update="true"
  >
    <template slot-scope="slotProps">
      <v-card>
        <v-card-title>{{ slotProps.item.Title }}</v-card-title>
      </v-card>
    </template>
  </list-view>
</template>
<script>
import ListView from '~/components/ListView.vue'

export default {
  data() {
    return {
      list: [
        { ID: 1, Title: 'test obj 1' },
        { ID: 2, Title: 'test obj 2' },
        { ID: 3, Title: 'test obj 3' },
        { ID: 3, Title: 'test obj 3' },
        { ID: 3, Title: 'test obj 3' },
        { ID: 3, Title: 'test obj 3' },
        { ID: 3, Title: 'test obj 3' },
        { ID: 3, Title: 'test obj 3' },
      ],
    }
  },
  methods: {
    onUpdate() {
      console.log('catched onUpdate in parent')
    },
    onCreate() {
      console.log('catched onCreate in parent')
    },
  },
  components: {
    ListView,
  },
}
</script>