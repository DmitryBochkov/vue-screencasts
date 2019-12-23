<template>
  <v-container class="text-left">
    <div class="display-2">{{ video.name }}</div>
    <div class="my-4" v-html="video.description"></div>
    <div>
      <v-combobox
      :items="tags"
      item-text="name"
      hide-selected
      deletable-chips
      chips
      multiple
      v-model="videoTags"
      return-object
      ></v-combobox>
    </div>
  </v-container>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import _ from 'lodash'

  export default {
    name: 'admin-video-show',
    computed: {
      ...mapState(['videos', 'tags']),
      ...mapGetters(['getTag']),
      video() {
        return this.videos.find(vid => vid.id == this.$route.params.id) || {}
      },
      videoTags: {
        get() {
          let tagIds = this.video.tag_ids
          return tagIds && tagIds.map(id => this.getTag(id))
        },
        async set(newTags) {
          let createdTag = newTags.find(t => typeof t === 'string')
          if (createdTag) {
            createdTag = await this.$store.dispatch('createTag', { name: createdTag })
            this.$store.dispatch('connectTagToVideo', { tag: createdTag, video: this.video })
          } else {
            let addedTags = _.differenceBy(newTags, this.videoTags, 'id')
            let removedTags = _.differenceBy(this.videoTags, newTags, 'id')

            if (addedTags.length > 0) {
              this.$store.dispatch('connectTagToVideo', { tag: addedTags[0], video: this.video })
            }

            if (removedTags.length > 0) {
              this.$store.dispatch('disconnectTagFromVideo', { tag: removedTags[0], video: this.video })
            }
          }
        }
      },
    },
    created() {
      this.$store.dispatch('loadAllTags')
    }
  }
</script>
