<template>
  <div class="home">
    <h1 class="display-3 ma-4 text-center">All Videos</h1>
    <v-container>
      <v-row>
        <v-col v-for="video in videos" :key="video.name" cols="12" md="6" lg="4">
          <VideoListVideo :video="video" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VideoListVideo from '@/components/VideoListVideo'
export default {
  name: 'home',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      videos: state => state.videos.videos,
      tags: state => state.tags.tags
    })
  },
  components: {
    VideoListVideo
  }
}
</script>
