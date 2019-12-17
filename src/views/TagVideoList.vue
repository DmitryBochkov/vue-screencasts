<template>
  <div class="">
    <h1 class="display-3 ma-4 text-center">Videos with "{{ tag.name }}" tag </h1>
    <v-container class="fill-height">
      <v-row>
        <v-col v-for="video in videosOnTag" :key="video.name" cols="12" md="6" lg="4">
          <VideoListVideo :video="video" />
        </v-col>
      </v-row>
    </v-container>
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
