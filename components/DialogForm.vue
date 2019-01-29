<template>
  <v-dialog v-model="show" persistent max-width="500px">
    <v-card>
      <v-card-title class="form-title">{{dialogTitle}}</v-card-title>
      <v-card-text>
        <v-container grid-list-md class="form-container">
          <v-layout wrap>
            <slot></slot>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="blue darken-1"
          :disabled="requestInProgress"
          flat
          @click.native="$emit('cancel')"
        >{{discardBtnTitle}}</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          :disabled="requestInProgress"
          flat
          @click.native="$emit('submit')"
        >{{confirmBtnTitle}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  components: {},
  props: {
    show: { type: Boolean, default: false },
    dialogTitle: { type: String },
    requestInProgress: { type: Boolean, default: false },
    // model: { type: Object },
    confirmBtnTitle: { type: String, default: 'Submit' },
    discardBtnTitle: { type: String, default: 'Cancel' },
  },
  data: () => ({}),
  mounted() {},
}
</script>
<style scoped lang="css">
.form-container {
  padding-top: 0;
}
.form-title {
  font-weight: 400;
  font-size: 16px;
}
</style>
