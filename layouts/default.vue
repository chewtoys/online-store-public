<template>
  <v-app>
    <v-navigation-drawer :clipped="true" v-model="drawer" fixed app>
      <v-list>
        <v-list-tile router :to="item.to" :key="i" v-for="(item, i) in items" exact>
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app clipped-left>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <img width="32" src="logo.svg">

      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon @click="showAuth = true" v-if="!authData.authenticated">
        <v-icon>account_circle</v-icon>
      </v-btn>
      <span v-if="authData.authenticated">{{authData.username}}</span>
      <v-btn icon @click="logout" v-if="authData.authenticated">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
      <auth-form :show="showAuth" v-on:close="showAuth = false"/>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>
    <v-navigation-drawer temporary :right="right" v-model="rightDrawer" fixed>
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-snackbar
      v-model="snackbar.show"
      :bottom="true"
      :multi-line="false"
      :timeout="snackbar.timeout"
    >
      {{ snackbar.message }}
      <v-btn :color="snackbar.btnColor" flat @click="hideSnackbar">Close</v-btn>
    </v-snackbar>
    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import AuthForm from "~/Components/AuthForm";
export default {
  components: {
    AuthForm
  },
  computed: {
    snackbar: function() {
      return this.$store.state.snackbar;
    },
    authData: function() {
      return this.$store.state.account;
    }
  },
  methods: {
    hideSnackbar: function() {
      this.$store.commit("snackbar/close");
    },
    logout: function() {
      this.$store.dispatch("account/logOut");
    }
  },
  data() {
    return {
      showAuth: false,
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        { icon: "apps", title: "Welcome", to: "/" },
        { icon: "category", title: "Categories", to: "/category" },
        { icon: "bubble_chart", title: "Inspire", to: "/inspire" }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Leoneed's"
    };
  },
  mounted() {
    this.$store.dispatch("account/authByRefresh").catch(function(err) {
      console.error(err);
    });

    // this.$store.commit("snackbar/show", {
    //   message: "test snackbar",
    //   btnColor: "pink",
    //   timeout: 5000
    // });
  }
};
</script>
