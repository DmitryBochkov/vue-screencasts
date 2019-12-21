import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Server, JSONAPISerializer, Model, hasMany } from "miragejs"
import videoJSON from "./mirage/videos.json"
import tagsJSON from "./mirage/tags.json"
import usersJSON  from "./mirage/users.json"
import vuetify from '@/plugins/vuetify'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCheck)

Vue.component('font-awesome-icon', FontAwesomeIcon)

new Server({
  serializers: {
    application: JSONAPISerializer,
    video: JSONAPISerializer.extend({
      include: ['tags'],
      normalize(json) {
        return {
          data: {
            type: "video",
            attributes: json
          }
        }
      }
    }),
    tag: JSONAPISerializer.extend({
      include: ['videos']
    }),
    user: JSONAPISerializer.extend({
      attrs: ['name', 'email', 'admin', 'token', 'playedVideos'],
      keyForAttribute(attr){
        return attr
      }
    })
  },
  fixtures: {
    videos: videoJSON,
    tags: tagsJSON,
    users: usersJSON,
  },
  models: {
    video: Model.extend({
      tags: hasMany()
    }),
    tag: Model.extend({
      videos: hasMany()
    }),
    user: Model
  },
  routes() {
    this.get('/videos')
    this.post('/videos')
    this.put('/videos/:id')
    this.delete('/videos/:id')
    this.get('/users')
    this.post("/users", function(schema, request) {
      let json = JSON.parse(request.requestBody)
      let response = schema.users.create(json)
      return this.serialize(response)
    })
    this.get("/users/:id")
    this.post("/sessions", function(schema, request) {
      let json = JSON.parse(request.requestBody)
      let response = schema.users.findBy({ email: json.email })
      if(json.password == 'qwerty') { // your actual backend should test the hashed password in the DB
        return this.serialize(response)
      } else {
        return new Response(401)
      }
    }),
    this.post('/video_plays', function() {
      return new Response(201)
    })
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
