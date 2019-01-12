<template>
  <v-layout row>
    <v-flex xs12>
      <v-card max-height="100%">
        <v-card-title class="blue white--text">
          <span class="headline">Permissions</span>
          <v-spacer></v-spacer>
          <!-- <v-menu v-if="isAdmin" bottom left> -->
        </v-card-title>
        <v-container fluid>
          <v-layout row wrap justify-space-between class="permissions-wrap" v-if="isAbleToAccess">
            <v-flex xs12>
              <v-flex xs3>
                <v-select
                  v-model="selectedRole"
                  @change="onRoleChanged"
                  item-text="Name"
                  item-value="Id"
                  :items="rolesList"
                  label="Role"
                ></v-select>
              </v-flex>
            </v-flex>
            <v-layout column v-if="selectedRole && listLoaded">
              <v-layout fluid row>
                <v-flex xs8 md4>
                  <span class="permissions-header">Type</span>
                </v-flex>
                <v-flex xs1 v-for="act in actions" :key="act">
                  <span class="permissions-header">{{act}}</span>
                </v-flex>
              </v-layout>
              <v-layout
                class="permission-row"
                fluid
                row
                v-for="item in rolePermissions"
                :key="item.EntityType"
              >
                <v-flex xs8 md4>{{item.EntityType}}</v-flex>
                <v-flex xs1 v-for="act in actions" :key="act">
                  <v-checkbox v-model="item[act]" @change="onPermissionChange(item, act)"/>
                </v-flex>
              </v-layout>
            </v-layout>
            <v-flex class="permissions-preloader" xs12 v-else-if="!listLoaded && selectedRole">
              <v-progress-circular :size="50" indeterminate></v-progress-circular>
            </v-flex>
          </v-layout>
          <access-denied v-else/>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import AccessDenied from '~/components/AccessDenied'
export default {
  components: {
    AccessDenied,
  },
  data() {
    return {
      selectedRole: null,
      listLoaded: false,
    }
  },
  computed: {
    rolesList() {
      return this.$store.state.permissions.roles
    },
    actions() {
      return this.$store.state.permissions.permissionsActions
    },
    rolePermissions() {
      return this.$store.state.permissions.rolePermissions
    },
    isAbleToAccess() {
      let account = this.$store.state.account
      return account.authenticated && account.username === 'admin'
    },
  },
  methods: {
    onRoleChanged: function() {
      this.$store
        .dispatch('permissions/getRolePermissions', this.selectedRole)
        .then(() => {
          this.listLoaded = true
        })
    },
    onPermissionChange: function(item, action) {
      this.$store.dispatch('permissions/updatePermission', {
        RoleID: this.selectedRole,
        Permission: action,
        EntityType: item.EntityType,
        IsEnabled: item[action],
      })
    },
  },
  mounted() {
    this.$store.dispatch('permissions/getRoles')
  },
}
</script>

<style lang="scss">
.permissions-wrap {
  .v-select__selections {
    cursor: pointer;
  }
  .permission-row {
    align-items: center;
  }
  .permissions-header {
    font-weight: 700;
    font-size: 1.2rem;
  }
  .permissions-preloader {
    text-align: center;
  }
}
</style>
