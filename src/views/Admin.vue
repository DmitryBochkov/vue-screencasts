<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-tabs>
          <v-tab :to="{ name: 'admin-video-list'}">Videos</v-tab>
          <v-tab :to="{ name: 'admin-user-list'}">Users</v-tab>
        </v-tabs>
      </v-col>

      <router-view></router-view>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'admin',


  }
</script>

<style lang="scss" scoped>

</style>
