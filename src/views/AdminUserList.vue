<template>
  <v-container class="text-left">
    <div v-for="user in users" :key="user.id">
      {{ user.name }}
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
    }
  }
</script>

<style scoped>
</style>
