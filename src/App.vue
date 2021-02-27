<template>
  <div id="app">
    <router-view />
    <div v-loading.fullscreen.lock="loading"></div>
    <v-dialog />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'App',
  computed: mapGetters({
    loading: 'getLoading'
  })
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

@media (max-width: 767px) {
  #logo {
    width: 100%;
    height: 100%;
  }
}
@media (min-width: 768px) {
  #logo {
    width: 600px;
    height: 400px;
  }
}
</style>
