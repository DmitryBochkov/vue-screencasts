<template>
  <router-link :to="{ name: 'video-watch', params: { id: video.id }}">
    <div class="video-box">
      <img :src="video.thumbnail" alt="video.name">
      <div>
        <h3>{{ video.name }}</h3>
        <div v-html="video.description"></div>
        <span v-for="tag_id in video.tag_ids" :key="tag_id">
          <router-link :to="{ name: 'tag', params: { id: tag_id }}">
            <button class="tag-button">{{ getTag(tag_id).name }}</button>
          </router-link>
        </span>
      </div>
    </div>
  </router-link>
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
  display: flex;
  justify-content: flex-start;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #000;
  text-align: left;

  img {
    width: 200px;
    padding: 10px;
    flex-shrink: 0;
  }
}
</style>
