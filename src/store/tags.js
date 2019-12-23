import Api from '../services/api'
export default {
  namespaced: true,
  state: {
    tags: []
  },
  getters: {
    getTag: state => id => state.tags.find(t => t.id == id)
  },
  mutations: {
    SET_TAGS(state, tags) {
      state.tags = tags
    },
    CREATE_TAG(state, {tag}) {
      state.tags = state.tags.concat(tag)
    },
    UPDATE_TAG_NAME(state, tag) {
      let tagToUpdade = state.tags.find(t => t.id == tag.id)
      tagToUpdade.name = tag.name
    },
    DELETE_TAG(state, tag) {
      state.tags = state.tags.filter(t => t.id != tag.id)
    },
    CONNECT_TAG(state, {tag, video}) {
      video.tag_ids = video.tag_ids.concat(tag.id.toString())
      tag.video_ids = tag.video_ids.concat(video.id.toString())
    },
    DISCONNECT_TAG(state, {tag, video}) {
      video.tag_ids = video.tag_ids.filter(tag_id => tag_id != tag.id)
      tag.video_ids = tag.video_ids.filter(video_id => video_id != video.id)
    },
  },
  actions: {
    async loadAllTags({commit}) {
      const response = await Api().get('/tags')
      let tags = response.data.data
      tags.forEach(t => {
        t.attributes.id = t.id
        t.attributes.video_ids = t.relationships.videos.data.map(v => v.id)
      })
      commit('SET_TAGS', tags.map(tag => tag.attributes))
    },
    async connectTagToVideo({commit}, {tag, video}) {
      await Api().post('/video_tags', {
        video_id: video.id,
        tag_id: tag.id
      })
      commit('CONNECT_TAG', { tag, video })
    },
    async disconnectTagFromVideo({commit}, {tag, video}) {
      await Api().post('/video_tags/delete', {
        video_id: video.id,
        tag_id: tag.id
      })
      commit('DISCONNECT_TAG', { tag, video })
    },
    async createTag({commit}, {name}) {
      let response = await Api().post('/tags', { name })
      let createdTag = response.data.data.attributes
      createdTag.id = response.data.data.id
      createdTag.video_ids = []
      commit('CREATE_TAG', { tag: createdTag })
      return createdTag
    },
    async updateTagName({commit}, tag) {
      await Api().put(`/tags/${tag.id}`, tag)
      commit('UPDATE_TAG_NAME', tag)
    },
    async deleteTag({commit}, tag) {
      await Api().delete(`/tags/${tag.id}`)
      commit('DELETE_TAG', tag)
    },
  },
}
