<template>
  <div class="home">
    <h1>Videos</h1>
    <div class="video-container">
      <div v-for="video in videos" :key="video.name">
        <router-link :to="{ name: 'video-watch', params: { id: video.id }}">
          <div class="video-box">
            <img :src="video.thumbnail" alt="video.name">
            <div>
              <h3>{{ video.name }}</h3>
              <div v-html="video.description"></div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      videos: this.$store.state.videos
    }
  },
  components: {}
}
</script>

<style scoped lang="scss">
  .video-container {
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
  }
</style>
