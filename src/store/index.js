import Vue from 'vue'
import Vuex from 'vuex'
import Api from '../services/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    videos: [],
    tags: [],
    playedVideos: [],
    users: [],
    currentUser: {},
    snackbar: {},
  },
  getters: {
    getTag: state => id => state.tags.find(t => t.id == id),
    users: state => state.users,
    currentUser: state => state.currentUser,
    snackbar: state => state.snackbar,
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
    SET_USERS(state, users) {
      state.users = users
    },
    LOG_OUT_USER(state) {
      state.currentUser = {}
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user
    },
    SET_SNACKBAR(state, snackbar) {
      state.snackbar = snackbar
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
    async loadUsers({commit}) {
      try {
        const response = await Api().get('/users')
        let users = response.data.data
        users.forEach(user => {
          user.attributes.id = user.id
        })

        commit('SET_USERS', users.map(u => u.attributes))
      } catch(err) {
        console.log(err)
      }
    },
    loadCurrentUser({commit}) {
      let user = JSON.parse(window.localStorage.getItem('user'))
      if (user == null) {
        user = {}
        window.localStorage.setItem('user', JSON.stringify(user))
      } else {
        commit('SET_CURRENT_USER', user)
      }
    },
    logoutUser({commit}) {
      commit('LOG_OUT_USER')
      window.localStorage.removeItem('user')
    },
    async loginUser({commit}, loginInfo) {
      try {
        const response = await Api().post('/sessions', loginInfo)
        let user = response.data.data
        user.attributes.id = user.id
        user = user.attributes

        commit('SET_CURRENT_USER', user)
        window.localStorage.setItem('user', JSON.stringify(user))
        return user
      } catch (err) {
        console.log(err)
        return { error: 'Email/password combination was incorrect. Please try again.' }
      }
    },
    async registerUser({commit}, registrationInfo) {
      try {
        const response = await Api().post('/users', registrationInfo);
        let user = response.data.data
        user.attributes.id = user.id
        user = user.attributes

        commit('SET_CURRENT_USER', user);
        return user;
      } catch {
        return {error: "There was an error.  Please try again."}
      }
    },
    setSnackbar({commit}, snackbar) {
      snackbar.showing = true
      snackbar.color = snackbar.color || 'success'
      commit('SET_SNACKBAR', snackbar)
    }
  },
  modules: {
  }
})
