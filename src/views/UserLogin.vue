<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="6" lg="4">
        <v-form v-model="valid">
          <v-text-field
            v-model="loginInfo.email"
            label="Email"
            type="email"
            :rules="[required('Email'), emailFormat()]"
          ></v-text-field>
          <v-text-field
            v-model="loginInfo.password"
            label="Password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            :rules="[required('Password'), minLength('Password', 5)]"
            :counter="true"
          ></v-text-field>

          <v-btn @click="loginUser" :disabled="!valid">Login</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { required, minLength, emailFormat } from '@/utils/validations'
  
  export default {
    name: 'user-login',
    data() {
      return {
        valid: false,
        loginInfo: {
          email: '',
          password: ''
        },
        showPassword: false,
        required,
        minLength,
        emailFormat
      }
    },
    methods: {
      async loginUser() {
        const user = await this.$store.dispatch('loginUser', this.loginInfo)

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
