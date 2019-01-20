<template>
  <v-layout row>
    <v-flex xs12>
      <v-card max-height="100%">
        <v-card-title class="blue white--text">
          <span class="headline">Permissions</span>
          <v-spacer></v-spacer>
          <!-- <v-menu v-if="isAdmin" bottom left> -->
        </v-card-title>
        <v-container v-if="pageLoaded" fluid>
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
              <h2 class="types-header">Type permissions</h2>
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

            <v-flex xs12 v-if="selectedRole" class="specials-wrap">
              <v-layout column align-content-start v-if="selectedRole && specialsLoaded">
                <h2 class="specials-header">Special permissions</h2>
                <v-layout
                  class="permission-row"
                  fluid
                  row
                  v-for="item in roleSpecials"
                  :key="item.PermissionID"
                >
                  <v-flex xs4>{{item.PermissionTitle}}</v-flex>
                  <v-checkbox v-model="item.IsEnabled" @change="onSpecialChange(item)"/>
                </v-layout>
              </v-layout>
              <v-flex
                class="permissions-preloader"
                xs12
                v-else-if="!specialsLoaded && selectedRole"
              >
                <v-progress-circular :size="50" indeterminate></v-progress-circular>
              </v-flex>
            </v-flex>
          </v-layout>

          <access-denied v-else/>
        </v-container>
        <v-container d-flex justify-space-around v-else>
          <v-progress-circular :size="50" indeterminate></v-progress-circular>
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
      pageLoaded: false,
      specialsLoaded: false,
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
    roleSpecials() {
      return this.$store.state.permissions.roleSpecials
    },
    isAbleToAccess() {
      return this.$store.getters['account/isInRole']('Admin')
    },
  },
  methods: {
    onRoleChanged: function() {
      this.$store
        .dispatch('permissions/getRolePermissions', this.selectedRole)
        .then(() => {
          this.listLoaded = true
          this.$store
            .dispatch(
              'permissions/getSpecialRolePermissions',
              this.selectedRole
            )
            .then(() => {
              this.specialsLoaded = true
            })
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
    onSpecialChange: function(item) {
      this.$store.dispatch('permissions/updateSpecial', {
        RoleID: this.selectedRole,
        PermissionID: item.PermissionID,
        IsEnabled: item.IsEnabled,
      })
    },
  },
  mounted() {
    this.$store.dispatch('permissions/getRoles').then(() => {
      this.pageLoaded = true
    })
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
  .types-header {
    margin-bottom: 2.5rem;
    margin-left: 2rem;
  }
  .specials-wrap {
    margin-top: 2rem;

    .specials-header {
      margin-left: 2rem;
      margin-bottom: 2.5rem;
    }
  }
}
</style>
