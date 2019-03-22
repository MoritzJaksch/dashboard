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
          "http://api.apixu.com/v1/forecast.json?key=0c7610c80c8e4fc78e3150630191903&q=tempelhof&days=5"
        )
        .then(res => {
          this.weather = res.data;
          console.log(this.weather);
          this.loaded = true;
        })
        .catch(err => {
          this.loaded = false;
          console.log(err);
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
</style>
