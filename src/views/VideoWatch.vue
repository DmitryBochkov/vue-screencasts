<template lang="html">
  <v-container>
    <v-row>
      <v-col cols="12" lg="7">
        <video-player
          ref="videoPlayer"
          :options="playerOptions"
          @ended="markPlayed"
        ></video-player>
      </v-col>
      <v-col cols="12" lg="5" class="text-left">
        <h3 class="display-1 mb-2">{{ video.name }}</h3>
        <template  v-if="currentUser.name">
          <p v-if="isPlayed" class="green--text"><font-awesome-icon icon="check" /> Played</p>
          <p v-else><v-btn x-small @click="markPlayed">Mark played</v-btn></p>
        </template>
        <div v-html="video.description"></div>
        <span class="" v-for="tag_id in video.tag_ids" :key="tag_id">
          <v-btn
          :to="{ name: 'tag', params: { id: tag_id }}"
          color="green lighten-2"
          class="my-1 mr-1"
          small
          >
          {{ getTag(tag_id) && getTag(tag_id).name }}
        </v-btn>
      </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import 'video.js/dist/video-js.css'

import { videoPlayer } from 'vue-video-player'

export default {
  components: {
    videoPlayer
  },
  computed: {
    video(){
      return this.videos.find(vid => vid.id == this.$route.params.id) || {}
    },
    ...mapGetters({
      getTag: 'tags/getTag',
      playedVideos: 'users/playedVideos',
      currentUser: 'users/currentUser',
    }),
    ...mapState({
      videos: state => state.videos.videos,
      // currentUser: state => state.users.currentUser
    }),
    // player() {
    //   return this.$refs.videoPlayer.player
    // },
    playerOptions(){
      return {
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0, 2.5, 3.0],
        sources: [{
          type: "video/mp4",
          // src: ''
          src: this.video.videourl
        }],
        poster: this.video.thumbnail,
        fluid: true
      }
    },
    isPlayed() {
      return this.playedVideos.includes(this.video.id)
    }
  },
  methods: {
    markPlayed() {
      if (!this.isPlayed) {
        this.$store.dispatch('users/markPlayed', this.video.id)
      }
    }
  }
}
</script>
