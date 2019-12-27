import Api from '../services/api'
export default {
  namespaced: true,
  state: {
    videos: [],
  },
  mutations: {
    SET_VIDEOS(state, videos) {
      state.videos = videos
    },
    ADD_VIDEO(state, video) {
      state.videos = state.videos.concat(video)
    },
    DELETE_VIDEO(state, videoId) {
      state.videos = state.videos.filter(v => v.id != videoId)
    },
    EDIT_VIDEO(state, newVideo) {
      // let video = state.videos.find(v => v.id == newVideo.id)
      // video = newVideo
      // let foundIndex = state.videos.findIndex(v => v.id == newVideo.id)
      // console.log(foundIndex);
      // state.videos.splice(foundIndex, 1, newVideo)
      state.videos.forEach(v => {
        if(v.id == newVideo.id) {
          v = newVideo
        }
      })
    },
  },
  actions: {
    async loadVideos({commit}) {
      const response = await Api().get('/videos')
      let videos = response.data.data
      videos.forEach(v => {
        v.attributes.id = v.id
        v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id)
      })
      //
      // let tags = response.data.included.filter(item => item.type === 'tags')
      // tags.forEach(t => {
      //   t.attributes.id = t.id
      //   t.attributes.video_ids = t.relationships.videos.data.map(v => v.id)
      // })

      commit('SET_VIDEOS', videos.map(v => v.attributes))
      // commit('SET_TAGS', tags.map(tag => tag.attributes))
    },
    async createVideo({commit}, video) {
      try {
        let response = await Api().post('/videos', video)
        let savedVideo = response.data.data
        savedVideo = { id: savedVideo.id, ...savedVideo.attributes }
        commit('ADD_VIDEO', savedVideo)
        return savedVideo
      } catch(err) {
        console.log(err)
      }
    },
    async deleteVideo({commit}, videoId) {
      try {
        const response = await Api().delete(`/videos/${videoId}`)
        if (response.status == 200 || response.status == 204) {
          commit('DELETE_VIDEO', videoId)
        }
      } catch(err) {
        console.log(err)
      }
    },
    async editVideo({commit}, video) {
      try {
        const response = await Api().put(`/videos/${video.id}`, video)
        let newVideo = response.data.data
        newVideo = { id: newVideo.id, ...newVideo.attributes }
        commit('EDIT_VIDEO', newVideo)
        return newVideo
      } catch(err) {
        console.log(err)
      }
    },
  },
}
