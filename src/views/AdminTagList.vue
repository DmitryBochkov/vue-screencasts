<template>
  <v-container class="text-left">
    <h1>Tag List</h1>
    <div class="flex-table">
      <div>Name</div>
      <div># videos</div>
      <div>Action</div>
    </div>
    <div v-for="tag in tags" :key="tag.id" class="flex-table">
      <div>
        <div v-if="tagEditingId == tag.id">
          <v-text-field
            v-model="tag.name"
            :id="`tag-edit-${tag.id}`"
            @blur="updateTagName(tag)"
            @keydown.enter="updateTagName(tag)"
            ></v-text-field>
        </div>
        <div v-else @click="setToEditing(tag)">{{ tag.name }}</div>
      </div>
      <div>
        <router-link :to="{ name: 'tag', params: { id: tag.id } }">
          {{ tag.video_ids.length }}
        </router-link>
      </div>
      <div class="actions">
        <v-btn x-small  @click="setToEditing(tag)">Edit</v-btn>
        <v-btn x-small @click="deleteTag(tag)">Delete</v-btn>
        <!-- <v-btn x-small :to="{ name: 'video-watch', params: { id: video.id } }">Watch</v-btn>
        <v-btn x-small :to="{ name: 'admin-video-show', params: { id: video.id } }">Show</v-btn>
        <v-btn x-small @click="deleteVideo(video)">Delete</v-btn> -->
      </div>
    </div>

    <div v-if="!isEditingNewTag">
      <v-btn small @click="startNewTag()">Add tag</v-btn>
    </div>
    <div v-else>
      <v-text-field
        v-model="newTagName"
        id="new-tag-name"
        @blur="createTag"
        @keydown.enter="createTag"
      ></v-text-field>
    </div>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        tagEditingId: '',
        isEditingNewTag: false,
        newTagName: '',
      }
    },
    computed: {
      ...mapState({
        tags: state => state.tags.tags
      })
    },
    methods: {
      setToEditing(tag) {
        this.tagEditingId = tag.id
        setTimeout(function() {
          document.getElementById(`tag-edit-${tag.id}`).focus()
        }, 1)
      },
      updateTagName(tag) {
        this.$store.dispatch('tags/updateTagName', tag)
        this.tagEditingId = ''
      },
      deleteTag(tag) {
        let confirmed = confirm(`Are you sure you want to delete the "${tag.name}" tag? It is connected to ${tag.video_ids.length} videos.`)
        if (confirmed) {
          this.$store.dispatch('tags/deleteTag', tag)
        }
      },
      startNewTag() {
        this.isEditingNewTag = true
        setTimeout(function() {
          document.getElementById('new-tag-name').focus()
        }, 1)
      },
      createTag() {
        if (this.newTagName.length > 0) {
          this.$store.dispatch('tags/createTag', { name: this.newTagName })
          this.newTagName = ''
        }
        this.isEditingNewTag = false
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
