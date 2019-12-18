<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <h1>Video Edit page</h1>
        <v-form class="text-left">
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

          <v-btn @click="editVideo">Update Video</v-btn>
        </v-form>
      </v-col>

      <v-col cols="12" md="6">
        <!-- <VideoListVideo :video="video" /> -->
        <v-card>
          <v-img aspect-ratio="1.7" :src="video.thumbnail" :alt="video.name"></v-img>
          <div>
            <v-card-title>{{ video.name }}</v-card-title>
            <v-card-text class="text-left">{{ video.description }}</v-card-text>
          </div>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'admin-video-edit',
    data() {
      return {
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
    computed: {
      ...mapState(['videos']),
      video() {
        return this.videos.find(vid => vid.id == this.$route.params.id) || {}
      }
    },
    methods: {
      async editVideo() {
        await this.$store.dispatch('editVideo', this.video)
        this.$router.push({ name: 'admin-video-list' })
      },
    },
  }
</script>

<style lang="css" scoped>

</style>
