<template>
  <div class="home">
    <h1>Videos</h1>
    <div class="video-container">
      <div v-for="video in videos" :key="video.name">
        <VideoListVideo :video="video" />
      </div>
    </div>
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
      videos: 'videos',
      tags: 'tags'
    })
  },
  components: {
    VideoListVideo
  }
}
</script>

<style scoped lang="scss">
  .video-container {

  }
</style>
