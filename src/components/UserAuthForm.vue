<template>
  <v-form v-model="valid">
    <v-text-field
      v-model="userInfo.email"
      label="Email"
      type="email"
      :rules="[required('Email'), emailFormat()]"
    ></v-text-field>
    <v-text-field
      v-model="userInfo.password"
      label="Password"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      @click:append="showPassword = !showPassword"
      :rules="[required('Password'), minLength('Password', 5)]"
      :counter="true"
    ></v-text-field>

    <v-btn @click="submitForm(userInfo)" :disabled="!valid">{{ buttonText }}</v-btn>
  </v-form>
</template>

<script>
  import { required, minLength, emailFormat } from '@/utils/validations'

  export default {
    name: 'user-auth-form',
    props: ['submitForm', 'buttonText'],
    data() {
      return {
        valid: false,
        userInfo: {
          email: '',
          password: ''
        },
        showPassword: false,
        required,
        minLength,
        emailFormat
      }
    },
  }
</script>

<style scoped>
</style>
