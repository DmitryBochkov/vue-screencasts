import Vue from 'vue'
import Vuex from 'vuex'
import Api from '../services/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    videos: [],
    tags: [],
    users: [],
    currentUser: {},
    snackbars: [],
  },
  getters: {
    getTag: state => id => state.tags.find(t => t.id == id),
    users: state => state.users,
    currentUser: state => state.currentUser,
    snackbars: state => state.snackbars,
    playedVideos: state => state.currentUser.playedVideos,
  },
  mutations: {
    SET_VIDEOS(state, videos) {
      state.videos = videos
    },
    SET_TAGS(state, tags) {
      state.tags = tags
    },
    SET_PLAYED_VIDEOS(state, playedVideos) {
      state.currentUser.playedVideos = playedVideos
    },
    MARK_VIDEO_PLAYED(state, videoId) {
      state.currentUser.playedVideos = state.currentUser.playedVideos.concat(videoId)
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
      state.snackbars = state.snackbars.concat(snackbar)
    },
    CONNECT_TAG(state, {tag, video}) {
      video.tag_ids = video.tag_ids.concat(tag.id.toString())
      tag.video_ids = tag.video_ids.concat(video.id.toString())
    },
    DISCONNECT_TAG(state, {tag, video}) {
      video.tag_ids = video.tag_ids.filter(tag_id => tag_id != tag.id)
      tag.video_ids = tag.video_ids.filter(video_id => video_id != video.id)
    },
    CREATE_TAG(state, {tag}) {
      state.tags = state.tags.concat(tag)
    },
    UPDATE_TAG_NAME(state, tag) {
      let tagToUpdade = state.tags.find(t => t.id == tag.id)
      tagToUpdade.name = tag.name
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
    async loadAllTags({commit}) {
      const response = await Api().get('/tags')
      let tags = response.data.data
      tags.forEach(t => {
        t.attributes.id = t.id
        t.attributes.video_ids = t.relationships.videos.data.map(v => v.id)
      })
      commit('SET_TAGS', tags.map(tag => tag.attributes))
    },
    async markPlayed({commit}, videoId) {
      await Api().post('/video_plays', { video_id: videoId })
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

    async loadCurrentUser({commit, dispatch}) {
      let user = JSON.parse(localStorage.getItem('user'))

      if (user === null) {
        user = {}
        // localStorage.setItem('user', JSON.stringify(user))
        commit('SET_CURRENT_USER', user)
      } else {
        commit('SET_CURRENT_USER', user)
        dispatch('loadPlayedVideos', user.id)
      }

    },

    async loadPlayedVideos({commit}, userId) {
      let response = await Api().get(`/users/${userId}`)
      let user = response.data.data.attributes
      commit('SET_PLAYED_VIDEOS', user.playedVideos)
    },

    logoutUser({commit}) {
      commit('LOG_OUT_USER')
      localStorage.removeItem('user')
    },
    async loginUser({commit, dispatch}, loginInfo) {
      try {
        const response = await Api().post('/sessions', loginInfo)
        let user = response.data.data
        user.attributes.id = user.id
        user = user.attributes

        dispatch('loadPlayedVideos', user.id)
        commit('SET_CURRENT_USER', user)
        localStorage.setItem('user', JSON.stringify(user))
        return user
      } catch (err) {
        console.log(err)
        return { error: 'Email/password combination was incorrect. Please try again.' }
      }
    },
    async registerUser({commit, dispatch}, registrationInfo) {
      try {
        const response = await Api().post('/users', registrationInfo);
        let user = response.data.data
        user.attributes.id = user.id
        user = user.attributes

        dispatch('loadPlayedVideos', user.id)
        commit('SET_CURRENT_USER', user);
        return user;
      } catch {
        return {error: "There was an error.  Please try again."}
      }
    },
    setSnackbar({commit}, snackbar) {
      snackbar.showing = true
      snackbar.color = snackbar.color || 'success'
      snackbar.timeout = snackbar.timeout || 4000
      commit('SET_SNACKBAR', snackbar)
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
  },
  modules: {
  }
})
