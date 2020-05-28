<template>
  <div id="app">
    <CompoOne />
  </div>
</template>

<script>
import CompoOne from './components/CompoOne.vue'
export default {
  name: 'App',
  components :{
    CompoOne
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
