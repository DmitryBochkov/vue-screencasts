<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <h1>Video Edit page</h1>
        <VideoEditForm :video="video" :saveVideo="editVideo" buttonText="Update Video"  />
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
  import VideoEditForm from '@/components/VideoEditForm'

  export default {
    name: 'admin-video-edit',
    computed: {
      ...mapState({
        videos: state => state.videos.videos
      }),
      video() {
        return this.videos.find(vid => vid.id == this.$route.params.id) || {}
      }
    },
    methods: {
      async editVideo() {
        const video = await this.$store.dispatch('videos/editVideo', this.video)
        this.$store.dispatch('snackbar/setSnackbar', { text: `You have successfully edited the video ${video.name}` })
        this.$router.push({ name: 'admin-video-list' })
      },
    },
    components: {
      VideoEditForm
    }
  }
</script>

<style lang="css" scoped>

</style>
