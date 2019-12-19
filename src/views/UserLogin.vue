<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="6" lg="4">
        <h1>Login</h1>
        <UserAuthForm :submitForm="loginUser" buttonText="Login" />
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
      async loginUser(loginInfo) {
        const user = await this.$store.dispatch('loginUser', loginInfo)

        if (user.error) {
          alert(user.error)
        } else {
          alert('Hello, ' + user.name)
        }
      }
    }
  }
</script>

<style scoped>
</style>
