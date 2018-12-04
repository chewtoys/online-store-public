<template>
  <v-layout row justify-center>
    <v-dialog v-model="show" persistent max-width="500px">
      <v-card>
        <v-card-title class="form-title">{{dialogTitle}}</v-card-title>
        <v-card-text>
          <v-container grid-list-md class="form-container">
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="category.Title" label="Title" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <file-input :required="true" @formData="onFileChange" label="Choose file..."/>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="blue darken-1"
            :disabled="requestInProgress"
            flat
            @click.native="$emit('close')"
          >Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            :disabled="requestInProgress"
            flat
            @click.native="create"
          >Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import FileInput from "~/inputs/FileInput";
export default {
  components: {
    FileInput
  },
  props: {
    show: Boolean,
    dialogTitle: String,
    model: Object
  },
  data: () => ({
    dialog: false,
    requestInProgress: false,
    category: {
      Title: "",
      Image: null,
      ImageID: null
    }
  }),
  methods: {
    onFileChange(e) {
      this.category.Image = e[0].get("data");
    },
    create() {
      var that = this;
      this.$store.dispatch("categories/create", {
        Title: that.category.Title,
        ImageID: that.category.ImageID
      });
      // this.$axios
      //   .postFile("file/upload", this.category.Image)
      //   .then(function(fileID) {
      //     that.category.ImageID = fileID;
      //     that.$store.dispatch("categories/create", {
      //       Title: that.category.Title,
      //       ImageID: that.category.ImageID
      //     });
      //   });
    }
  },
  mounted() {
    Object.assign(this.category, this.model);
  }
};
</script>
<style lang="css">
.form-container {
  padding-top: 0;
}
.form-title {
  font-weight: 400;
  font-size: 16px;
}
</style>
