<template>
  <v-dialog v-model="show" persistent max-width="500px">
    <v-card>
      <v-card-title class="headline">{{title}}</v-card-title>
      <v-card-text>{{text}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" flat="flat" @click.native="$emit('confirm')">{{yesBtnText}}</v-btn>
        <v-btn color="green darken-1" flat="flat" @click.native="$emit('cancel')">{{noBtnText}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    title: { type: String },
    text: { type: String },
    yesBtnText: { type: String, default: 'Yes' },
    noBtnText: { type: String, default: 'No' },
    show: { type: Boolean },
  },
}
</script>
