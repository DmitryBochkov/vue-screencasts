<template>
  <div class="">
    <h1>Videos with "{{ tag.name }}" tag </h1>
    <div v-for="video in videosOnTag" :key="video.id">
      <VideoListVideo :video="video" />
    </div>
  </div>
</template>

<script>
  import VideoListVideo from '@/components/VideoListVideo'
  import { mapState, mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapState({
        videos: 'videos'
      }),
      ...mapGetters({
        getTag: 'getTag'
      }),
      tag() {
        return this.getTag(this.$route.params.id) || {}
      },
      videosOnTag() {
        return this.videos.filter(v => this.tag.video_ids.includes(v.id.toString()))
      }
    },
    components: {
      VideoListVideo
    }
  }
</script>
