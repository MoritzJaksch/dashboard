<template>
  <div id="app">
    <div id="widget-container">
      <Weather />
      <Iss />
      <Nasa />
      <Twitter />
      <Quote />
      <Meetup />
      <PublicTransport />
    </div>
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
import PublicTransport from "./components/PublicTransport.vue";

export default {
  name: "app",
  components: {
    Weather,
    Iss,
    Nasa,
    Twitter,
    Quote,
    Meetup,
    PublicTransport
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
  color: #2c3e50;
  margin-top: 60px;
}
#widget-container {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}
</style>
