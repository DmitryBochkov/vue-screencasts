<template lang="html">
  <div>
    <video-player
      class="video-player-box"
      ref="videoPlayer"
      :options="playerOptions"
    ></video-player>
    <h3>{{ video.name }}</h3>
    <div v-html="video.description"></div>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'

import { videoPlayer } from 'vue-video-player'

export default {
  components: {
    videoPlayer
  },
  computed: {
    video() {
      return this.$store.state.videos.find(vid => vid.id === +this.$route.params.id)
    },
    playerOptions() {
      return {
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: "video/mp4",
          src: this.video.videoUrl
        }],
        poster: this.video.thumbnail
      }
    }
  },
}
</script>

<style lang="scss">
  .video-player-box {
    .video-js {
      // width: 100%;
      // max-width: 700px;
      margin: auto;
    }
  }
</style>
