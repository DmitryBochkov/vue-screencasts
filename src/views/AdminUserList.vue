<template>
  <v-container class="text-left">
    <div v-for="user in users" :key="user.id">
      {{ user.name }} <v-btn x-small @click="loginUser(user)">Login</v-btn>
    </div>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        users: 'users'
      })
    },
    mounted() {
      this.$store.dispatch('loadUsers')
    },
    methods: {
      loginUser(user) {
        this.$store.dispatch('loginUser', user)
      }
    }
  }
</script>

<style scoped>
</style>
