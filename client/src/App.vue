<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Weather />
    <Iss />
    <Nasa />
    <Twitter />
    <Quote />
    <Meetup />
  </div>
</template>

<script>
import axios from "axios";
import Weather from "./components/Weather.vue";
import Iss from "./components/Iss.vue";
import Nasa from "./components/Nasa.vue";
import Twitter from "./components/Twitter.vue";
import Quote from "./components/Quote.vue";
import Meetup from "./components/Meetup.vue";

export default {
  name: "app",
  components: {
    Weather,
    Iss,
    Nasa,
    Twitter,
    Quote,
    Meetup
  },
  data() {
    return {};
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
