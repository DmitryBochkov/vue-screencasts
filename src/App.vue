<template>
  <v-app>
    <v-app-bar app color="green">
      <v-toolbar-title class="headline text-uppercase">
        <span>
          <v-btn text to="/">Vue Screencasts</v-btn>
        </span>
        <v-btn text :to="{ name: 'admin-video-list'}" v-if="this.currentUser.admin">Admin Page</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span v-if="currentUser.name">
        {{ currentUser.name }}
        <v-btn text>
          <span class="mr-2" @click="logout">Logout</span>
        </v-btn>
      </span>
      <v-btn text v-else :to="{ name: 'user-login' }">
        <span class="mr-2">Login</span>
      </v-btn>
      <v-btn v-if="!this.currentUser.name" text :to="{ name: 'user-registration' }">
        <span class="mr-2">Register</span>
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>

    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter(s => s.showing)"
      :key="snackbar.text + Math.random()"
      v-model="snackbar.showing"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      :style="`bottom: ${(index * 20) + 10}px`"
    >
      {{ snackbar.text }}
      <v-btn text @click="snackbar.showing = false"
        >
        Close
      </v-btn>
    </v-snackbar>

  </v-app>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'app',
    computed: {
      ...mapGetters({
        currentUser: 'currentUser',
        snackbars: 'snackbar/snackbars'
      }),
      ...mapActions({
        loadVideos: 'loadVideos',
        logoutUser: 'logoutUser',
        loadCurrentUser: 'loadCurrentUser',
        loadAllTags: 'tags/loadAllTags',
      })
    },
    methods: {
      logout() {
        this.logoutUser
      }
    },
    created() {
      this.loadVideos
      this.loadAllTags
      this.loadCurrentUser
    }
  }
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.tag-button {
  padding: 5px;
  margin: 3px;
  font-size: 16px;
  background-color: #72c9a2;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}
</style>
