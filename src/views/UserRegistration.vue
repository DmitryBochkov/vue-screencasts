<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="6" lg="4">
        <h1>Registration</h1>
        <UserAuthForm :submitForm="registerUser" buttonText="Register" hasName="true" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import UserAuthForm from '@/components/UserAuthForm'

  export default {
    name: 'user-login',
    components: {
      UserAuthForm
    },
    methods: {
      async registerUser(registrationInfo) {
        const user = await this.$store.dispatch('registerUser', registrationInfo)

        if (user.error) {
          this.$store.dispatch('setSnackbar', { text: `${user.error}`, color: 'error' })
        } else {
          this.$store.dispatch('setSnackbar', { text: `Welcome to the app, ${user.name}` })
          this.$router.push({ name: 'home' })
        }
      }
    }
  }
</script>

<style scoped>
</style>
