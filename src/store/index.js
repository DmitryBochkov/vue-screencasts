import Vue from 'vue'
import Vuex from 'vuex'
import Api from '../services/api'
import snackbarModule from './snackbar'
import tagsModule from './tags'
import videosModule from './videos'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    snackbar: snackbarModule,
    tags: tagsModule,
    videos: videosModule,
  },
  state: {
    users: [],
    currentUser: {},
  },
  getters: {
    users: state => state.users,
    currentUser: state => state.currentUser,
    playedVideos: state => state.currentUser.playedVideos,
  },
  mutations: {
    SET_PLAYED_VIDEOS(state, playedVideos) {
      state.currentUser.playedVideos = playedVideos
    },
    MARK_VIDEO_PLAYED(state, videoId) {
      state.currentUser.playedVideos = state.currentUser.playedVideos.concat(videoId)
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
  },
  actions: {
    async markPlayed({commit}, videoId) {
      await Api().post('/video_plays', { video_id: videoId })
      commit('MARK_VIDEO_PLAYED', videoId)
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
  },
})
