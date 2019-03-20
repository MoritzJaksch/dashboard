<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Weather :msg="msg" />
    <Iss :msg="msg" />
    <Nasa />
  </div>
</template>

<script>
import axios from "axios";
import Weather from "./components/Weather.vue";
import Iss from "./components/Iss.vue";
import Nasa from "./components/Nasa.vue";

export default {
  name: "app",
  components: {
    Weather,
    Iss,
    Nasa
  },
  data() {
    return {
      msg: "fuck off",
      weather: {},
      issPosition: {}
    };
  },
  created() {},
  mounted() {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
