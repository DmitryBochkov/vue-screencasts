<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <h1>Video Create page</h1>
        <VideoEditForm :video="video" :saveVideo="createVideo" buttonText="Save Video" />
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
import VideoEditForm from '@/components/VideoEditForm'

export default {
  data() {
    return {
      video: {
        name: '',
        description: '',
        thumbnail: '',
        videourl: '',
      }
    }
  },
  components: {
    VideoEditForm
  },
  methods: {
    async createVideo() {
      const video = await this.$store.dispatch('createVideo', this.video)
      this.$router.push({ name: 'video-watch', params: { id: video.id } })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
