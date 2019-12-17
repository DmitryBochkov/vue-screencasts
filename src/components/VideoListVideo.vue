<template>
  <v-card hover>
    <router-link :to="{ name: 'video-watch', params: { id: video.id }}">
      <v-img aspect-ratio="1.7" :src="video.thumbnail" :alt="video.name"></v-img>
    </router-link>
    <div>
      <router-link :to="{ name: 'video-watch', params: { id: video.id }}">
        <v-card-title>{{ video.name }}</v-card-title>
      </router-link>
      <v-card-actions>
        <span v-for="tag_id in video.tag_ids" :key="tag_id">
          <v-btn
          color="green lighten-2"
          class="mr-2"
          :to="{ name: 'tag', params: { id: tag_id }}"
          small
          >
          {{ getTag(tag_id).name }}
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
        getTag: 'getTag'
      })
    }
  }
</script>

<style scoped lang="scss">
.video-box {
  // display: flex;
  // justify-content: flex-start;
  // margin: 10px;
  // padding: 10px;
  // border-radius: 10px;
  // border: 1px solid #000;
  // text-align: left;

  img {
    // width: 200px;
    // padding: 10px;
    // flex-shrink: 0;
  }
}
</style>
