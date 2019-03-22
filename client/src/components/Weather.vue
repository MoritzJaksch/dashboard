<template>
  <div v-if="loaded" class="weather">
    <div class="weather-container">
      <div class="current-container">
        <div class="current">
          <img :src="weather.current.condition.icon" alt="" />
          <p>{{ weather.current["temp_c"] }} C°</p>
        </div>
      </div>

      <div class="forecast-container">
        <div v-for="day in weather.forecast.forecastday" class="forecast">
          <p>{{ moments(day.date) }}</p>
          <p>{{ day.day["avgtemp_c"] }} C°</p>
          <img :src="day.day.condition.icon" />
        </div>
      </div>
    </div>
  </div>

  <div v-else class="weather">
    <div class="container-not-loaded">
      <div class="lds-loading">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "Weather",
  props: {},
  methods: {
    moments(date) {
      let day = moment(date).format("ddd");
      return day;
    },

    getWeather() {
      axios
        .get(
          "https://api.apixu.com/v1/forecast.json?key=0c7610c80c8e4fc78e3150630191903&q=tempelhof&days=5"
        )
        .then(res => {
          this.weather = res.data;
          // this.loaded = true;
        })
        .catch(err => {
          this.loaded = false;
        });
    }
  },
  data() {
    return {
      weather: {},
      loaded: false
    };
  },
  created() {
    this.getWeather();
    setInterval(() => {
      this.getWeather();
    }, 60000);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.weather-container {
  width: 100%;
  height: 100%;
  color: white;
  border-radius: 5px;
  display: grid;
  grid-template-rows: 40% 60%;
}
.forecast-container {
  display: flex;
  justify-content: space-around;
}
.forecast {
  padding: 5px;
  margin: 5px;
  text-align: center;
  background-color: rgb(79, 78, 78);
  border-radius: 5px;
}
.forecast img {
  height: 60px;
}

.current-container img {
  height: 100px;
  width: 100px;
}
.current-container p {
  font-size: 4em;
  margin-top: 2%;
  margin-left: 5%;
  margin-bottom: 0;
  height: 100px;
  width: 200px;
}
.current {
  display: flex;
  margin-top: 4%;
}

/* LOADER CSS */
.container-not-loaded {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.lds-loading {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-loading div {
  display: inline-block;
  position: absolute;
  left: 6px;
  width: 13px;
  background: #fff;
  animation: lds-loading 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-loading div:nth-child(1) {
  left: 6px;
  animation-delay: -0.24s;
}
.lds-loading div:nth-child(2) {
  left: 26px;
  animation-delay: -0.12s;
}
.lds-loading div:nth-child(3) {
  left: 45px;
  animation-delay: 0;
}
@keyframes lds-loading {
  0% {
    top: 6px;
    height: 51px;
  }
  50%,
  100% {
    top: 19px;
    height: 26px;
  }
}
</style>
