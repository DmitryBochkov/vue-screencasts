import Vue from 'vue'
import Vuex from 'vuex'
import Api from '../services/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    videos: [],
    tags: [],
    playedVideos: []
  },
  getters: {
    getTag: state => id => state.tags.find(t => t.id == id)
  },
  mutations: {
    SET_VIDEOS(state, videos) {
      state.videos = videos
    },
    SET_TAGS(state, tags) {
      state.tags = tags
    },
    SET_PLAYED_VIDEOS(state, playedVideos) {
      state.playedVideos = playedVideos
    },
    MARK_VIDEO_PLAYED(state, videoId) {
      state.playedVideos = state.playedVideos.concat(videoId)
    },
    ADD_VIDEO(state, video) {
      state.videos = state.videos.concat(video)
    },
    DELETE_VIDEO(state, videoId) {
      state.videos = state.videos.filter(v => v.id != videoId)
    }
  },
  actions: {
    async loadVideos({commit}) {
      const response = await Api().get('/videos')
      let videos = response.data.data
      videos.forEach(v => {
        v.attributes.id = v.id
        v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id)
      })

      let tags = response.data.included.filter(item => item.type === 'tags')
      tags.forEach(t => {
        t.attributes.id = t.id
        t.attributes.video_ids = t.relationships.videos.data.map(v => v.id)
      })

      commit('SET_VIDEOS', videos.map(v => v.attributes))
      commit('SET_TAGS', tags.map(tag => tag.attributes))

      let playedVideos = JSON.parse(window.localStorage.getItem('playedVideos'))
      if (playedVideos == null) {
        playedVideos = []
        window.localStorage.setItem('playedVideos', JSON.stringify(playedVideos))
      } else {
        commit('SET_PLAYED_VIDEOS', playedVideos)
      }
    },
    markPlayed({commit}, videoId) {
      let playedVideos = JSON.parse(window.localStorage.getItem('playedVideos'))
      playedVideos = playedVideos.concat(videoId)
      window.localStorage.setItem('playedVideos', JSON.stringify(playedVideos))
      commit('MARK_VIDEO_PLAYED', videoId)
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
    }
  },
  modules: {
  }
})
