<template>
  <v-layout row v-if="isAbleToAccess">
    <v-flex xs12>
      <v-card max-height="100%">
        <v-card-title class="blue white--text">
          <span class="headline">Permissions</span>
          <v-spacer></v-spacer>
          <!-- <v-menu v-if="isAdmin" bottom left> -->
        </v-card-title>
        <v-container fluid>
          <v-layout row wrap justify-space-between class="permissions-wrap">
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
            <v-layout column v-if="selectedRole">
              <v-layout fluid row>
                <v-flex xs8 md4>
                  <span class="permissions-header">Type</span>
                </v-flex>
                <v-flex xs1>
                  <span class="permissions-header">Create</span>
                </v-flex>
                <v-flex xs1>
                  <span class="permissions-header">Read</span>
                </v-flex>
                <v-flex xs1>
                  <span class="permissions-header">Update</span>
                </v-flex>
                <v-flex xs1>
                  <span class="permissions-header">Delete</span>
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
                <v-flex align-content-center xs1>
                  <v-checkbox v-model="item.Create" @change="onPermissionChange(item)"/>
                </v-flex>
                <v-flex xs1>
                  <v-checkbox v-model="item.Read"/>
                </v-flex>
                <v-flex xs1>
                  <v-checkbox v-model="item.Update"/>
                </v-flex>
                <v-flex xs1>
                  <v-checkbox v-model="item.Delete"/>
                </v-flex>
              </v-layout>
            </v-layout>
            <!-- <v-flex xs12 column v-for="item in rolePermissions" :key="item.EntityType">
              <v-flex xs1>
                <v-checkbox/>
              </v-flex>
            </v-flex>-->
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      selectedRole: null,
    }
  },
  computed: {
    rolesList() {
      return this.$store.state.permissions.roles
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
      this.$store.dispatch('permissions/getRolePermissions', this.selectedRole)
    },
    onPermissionChange: function(item) {
      console.log(item)
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
}
</style>
