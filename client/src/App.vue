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
      <div id="clock">
        <Clock />
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
import Clock from "./components/Clock.vue";

export default {
  name: "app",
  components: {
    Weather,
    Iss,
    Nasa,
    Twitter,
    Quote,
    Meetup,
    PublicTransport,
    Clock
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
  color: rgb(46, 46, 46);
}
#weather {
  grid-area: 2 / 2 / 4 / 3;
}
#twitter {
  min-width: 375px;
  height: 340px;
  grid-area: 2 / 3 / 4 / 4;
}
#meetup {
  grid-area: 2 / 6 / 7 / 7;
}
#nasa {
  grid-area: 4 / 3 / 7 / 5;
}
#iss {
  grid-area: 4 / 2 / 7 / 3;
}
#quote {
  min-width: 250px;
  grid-area: 2 / 5 / 4 / 6;
}
#public-transport {
  grid-area: 4 / 5 / 7 / 6;
}
#clock {
  grid-area: 2 / 4 / 4 / 5;
}

#widget-container {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 5% repeat(5, 1fr) 5%;
  grid-template-rows: repeat(7, 1fr);
  grid-gap: 1em;
}

/* CLASSES */
.weather {
  height: 100%;
  width: 100%;
  background-color: rgb(108, 108, 108);
  border-radius: 5px;
  box-shadow: 7px 9px 23px -4px rgba(0, 0, 0, 0.61);
}

.nasa {
  height: 100%;
  width: 100%;
  background-color: rgb(108, 108, 108);
  border-radius: 5px;
  box-shadow: 7px 9px 23px -4px rgba(0, 0, 0, 0.61);
}

.quote {
  height: 100%;
  width: 100%;
  background-color: rgb(108, 108, 108);
  border-radius: 5px;
  box-shadow: 7px 9px 23px -4px rgba(0, 0, 0, 0.61);
}

.time {
  height: 100%;
  width: 100%;
  background-color: rgb(108, 108, 108);
  color: white;
  border-radius: 5px;
  box-shadow: 7px 9px 23px -4px rgba(0, 0, 0, 0.61);
}
.meetup-container {
  background-color: rgb(108, 108, 108);
  height: 100%;
  width: 100%;
  border-radius: 5px;
  box-shadow: 7px 9px 23px -4px rgba(0, 0, 0, 0.61);
}
.departure-container {
  background-color: rgb(108, 108, 108);
  height: 100%;
  width: 100%;
  border-radius: 5px;
  box-shadow: 7px 9px 23px -4px rgba(0, 0, 0, 0.61);
}
.twitter {
  background-color: rgb(108, 108, 108);
  border-radius: 5px;
  height: 100%;
  width: 100%;
  box-shadow: 7px 9px 23px -4px rgba(0, 0, 0, 0.61);
}
.iss {
  width: 100%;
  height: 100%;
  background-color: rgb(108, 108, 108);
  box-shadow: 7px 9px 23px -4px rgba(0, 0, 0, 0.61);
}
.loaded {
  height: 100%;
  width: 100%;
}

/* tags */

body {
  background-color: rgb(88, 88, 88);
  margin: 0;
}

@media only screen and (max-width: 600px) {
  body {
    width: 100%;
    margin-left: 10px;
    margin-top: 10px;
  }

  #widget-container {
    grid-template-columns: 1fr;
    width: 100%;
    grid-gap: 1em;
  }
  #clock {
    grid-area: 1 / 1 / 2 / 2;
  }
  #weather {
    grid-area: 2 / 1 / 3 / 2;
    max-height: 300px;
  }
  #twitter {
    grid-area: 3 / 1 / 4 / 2;
  }
  #meetup {
    grid-area: 4 / 1 / 5 / 2;
  }
  #nasa {
    grid-area: 5 / 1 / 6 / 2;
  }
  #quote {
    grid-area: 6 / 1 / 7 / 2;
  }
  #iss {
    grid-area: 7 / 1 / 8 / 2;
  }
  #public-transport {
    grid-area: 8 / 1 / 9 / 2;
  }
}
</style>
