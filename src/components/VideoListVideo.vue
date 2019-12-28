<template>
  <v-card hover>
    <router-link :to="{ name: 'video-watch', params: { id: video.id }}">
      <v-img aspect-ratio="1.7" :src="video.thumbnail" :alt="video.name"></v-img>
    </router-link>
    <div>
      <router-link :to="{ name: 'video-watch', params: { id: video.id }}">
        <v-card-title>{{ video.name }}</v-card-title>
      </router-link>
      <v-card-text v-if="currentUser.name && isPlayed" class="green--text text-left"><font-awesome-icon icon="check" /> Played</v-card-text>
      <v-card-actions>
        <span v-for="tag_id in video.tag_ids" :key="tag_id">
          <v-btn
          color="green lighten-2"
          class="mr-2"
          :to="{ name: 'tag', params: { id: tag_id }}"
          small
          >
          {{ getTag(tag_id) && getTag(tag_id).name }}
        </v-btn>
      </span>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    props: ['video'],
    computed: {
      ...mapGetters({
        getTag: 'tags/getTag',
        playedVideos: 'users/playedVideos',
        currentUser: 'users/currentUser',
      }),
      isPlayed() {
        return this.playedVideos.includes(this.video.id)
      }
    }
  }
</script>
