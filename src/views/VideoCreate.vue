<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <h1>Video Create page</h1>
        <v-form class="text-left">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                v-model="video.name"
                label="Name"
                required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="video.description"
                  label="Description"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="video.thumbnail"
                  label="Thumbnail URL"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="video.videourl"
                  label="Video URL"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-btn @click="createVideo">Create Video</v-btn>
              </v-col>

            </v-row>
          </v-container>
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
// import VideoListVideo from '@/components/VideoListVideo'
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
    // VideoListVideo
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
