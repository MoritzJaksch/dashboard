<template>
  <div id="app">
    <div id="widget-container">
      <div id="weather">
        <Weather />
      </div>
      <div id="iss">
        <Iss />
      </div>
      <div id="nasa">
        <Nasa />
      </div>
      <div id="twitter">
        <Twitter />
      </div>
      <div id="quote">
        <Quote />
      </div>
      <div id="meetup">
        <Meetup />
      </div>
      <div id="public-transport">
        <PublicTransport />
      </div>
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
/* IDs */
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#weather {
  grid-area: 2 / 2 / 4 / 3;
}
#twitter {
  grid-area: 2 / 3 / 4 / 5;
}
#meetup {
  grid-area: 2 / 6 / 7 / 7;
}
#nasa {
  grid-area: 4 / 2 / 7 / 3;
}
#iss {
  grid-area: 4 / 3 / 7 / 5;
}
#quote {
  grid-area: 2 / 5 / 4 / 6;
}
#public-transport {
  grid-area: 4 / 5 / 7 / 6;
}

#widget-container {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 0.5fr repeat(5, 1fr) 0.5fr;
  grid-template-rows: repeat(7, 1fr);
  grid-gap: 2em;
}

/* CLASSES */
.weather {
  height: 100%;
  width: 100%;
}

.nasa {
  height: 100%;
  width: 100%;
  background-color: rgb(108, 108, 108);
  border-radius: 5px;
}
.loaded {
  height: 100%;
  width: 100%;
}

/* tags */

body {
  background-color: rgb(47, 47, 47);
  margin: 0;
}
</style>
