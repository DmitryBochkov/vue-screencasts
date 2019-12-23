<template>
  <v-container class="text-left">
    <h1>Tag List</h1>
    <div class="flex-table">
      <div>Name</div>
      <div># videos</div>
      <div>Action</div>
    </div>
    <div v-for="tag in tags" :key="tag.id" class="flex-table">
      <div>{{ tag.name }}</div>
      <div>
        <router-link :to="{ name: 'tag', params: { id: tag.id } }">
          {{ tag.video_ids.length }}
        </router-link>
      </div>
      <div class="actions">
        <!-- <v-btn x-small :to="{ name: 'video-watch', params: { id: video.id } }">Watch</v-btn>
        <v-btn x-small :to="{ name: 'admin-video-show', params: { id: video.id } }">Show</v-btn>
        <v-btn x-small :to="{ name: 'admin-video-edit', params: { id: video.id } }">Edit</v-btn>
        <v-btn x-small @click="deleteVideo(video)">Delete</v-btn> -->
      </div>
    </div>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState({
        tags: 'tags'
      })
    },
  }
</script>

<style lang="scss" scoped>
.flex-table {
  display: grid;
  grid-template-columns: repeat(auto-fill, 33%);
  padding: 5px 10px;
  border-bottom: 1px solid #000;

  &:nth-of-type(2n) {
    background-color: #dedede;
  }

  .actions {
    .v-btn {
      margin-right: 15px;
    }
  }
}
</style>
