<template>
  <v-form class="text-left" v-model="valid">
    <v-text-field
      v-model="video.name"
      label="Name"
      counter=50
      :rules="[required('Name'), minLength('Name', 3), maxLength('Name', 50)]"
    ></v-text-field>

    <v-textarea
      v-model="video.description"
      label="Description"
      counter=true
      :rules="[required('Description'), minLength('Description', 20)]"
    ></v-textarea>

    <v-text-field
      v-model="video.thumbnail"
      label="Thumbnail URL"
      :rules="[required('Thumbnail URL')]"
    ></v-text-field>

    <v-text-field
      v-model="video.videourl"
      label="Video URL"
      :rules="[required('Video URL')]"
    ></v-text-field>

    <v-btn @click="saveVideo" :disabled="!valid">{{ buttonText }}</v-btn>
  </v-form>
</template>

<script>
  export default {
    name: 'video-edit-form',
    props: ['video', 'saveVideo', 'buttonText'],
    data() {
      return {
        valid: false,
        required(propertyName) {
          return val => val && val.length > 0 || `${propertyName} is required.`
        },
        minLength(propertyName, minLength) {
          return val => val && val.length >= minLength || `${propertyName} must be at least ${minLength} characters.`
        },
        maxLength(propertyName, maxLength) {
          return val => val && val.length <= maxLength || `${propertyName} must be less than ${maxLength} characters.`
        },
      }
    },
  }
</script>
