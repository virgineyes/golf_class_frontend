<template>
  <div id="app">
    <img id="logo" alt="logo" src="./assets/logo.png">
    <SelectTool/>
     <v-dialog />
  </div>
</template>

<script>
import SelectTool from './components/SelectTool.vue'

export default {
  name: 'App',
  components: {
    SelectTool
  }
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
