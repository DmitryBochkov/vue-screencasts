<template lang="html">
  <div>
    <video-player
      v-if="video"
      class="video-player-box"
      ref="videoPlayer"
      :options="playerOptions"
    ></video-player>
    <span class="" v-for="tag_id in video.tag_ids" :key="tag_id">
      <router-link :to="{ name: 'tag', params: { id: tag_id }}">
        <button class="tag-button">{{ getTag(tag_id).name }}</button>
      </router-link>
    </span>
    <h3>{{ video.name }}</h3>
    <div v-html="video.description"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import 'video.js/dist/video-js.css'

import { videoPlayer } from 'vue-video-player'

export default {
  components: {
    videoPlayer
  },
  computed: {
    ...mapGetters({
      getTag: 'getTag'
    }),
    video() {
      return this.$store.state.videos.find(vid => vid.id == this.$route.params.id) || {}
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
      max-height: 600px;
      margin: auto;
    }
  }
</style>
