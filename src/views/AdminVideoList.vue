<template>
  <v-container class="text-left">
    <h1>Video List</h1>
    <v-btn text :to="{ name: 'admin-video-create'}">Add Video</v-btn>
    <div class="flex-table">
      <div>Name</div>
      <div>Description</div>
      <div>Action</div>
    </div>
    <div v-for="video in videos" :key="video.id" class="flex-table">
      <div>{{ video.name }}</div>
      <div>{{ video.description | abbreviate }}</div>
      <div class="actions">
        <v-btn x-small :to="{ name: 'video-watch', params: { id: video.id } }">View</v-btn>
        <v-btn x-small :to="{ name: 'admin-video-edit', params: { id: video.id } }">Edit</v-btn>
        <v-btn x-small @click="deleteVideo(video)">Delete</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'admin-video-list',
    computed: {
      ...mapState(['videos'])
    },
    filters: {
      abbreviate(text) {
        if (text) {
          text = text.replace('<p>', '')
          return text.slice(0, 50)
        }
      }
    },
    methods: {
      deleteVideo(video) {
        const response = confirm(`Are you sure you want to delete ${video.name}?`)
        if (response) {
          this.$store.dispatch('deleteVideo', parseInt(video.id))
        }
      },
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
