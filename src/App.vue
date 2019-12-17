<template>
  <v-app>
    <v-app-bar app color="green">
      <v-toolbar-title class="headline text-uppercase">
        <span>
          <v-btn text to="/">Vue Screencasts</v-btn>
        </span>
        <v-btn text :to="{ name: 'video-create'}">Add Video</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>
        <span class="mr-2">Login</span>
      </v-btn>
    </v-app-bar>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: 'app',
    mounted() {
      this.$store.dispatch('loadVideos')
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
