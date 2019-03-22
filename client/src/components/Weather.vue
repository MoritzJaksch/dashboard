<template>
  <div v-if="weather.current" class="weather">
    <div class="weather-container">
      <img class="current" :src="weather.current.condition.icon" alt="" />

      <div class="forecast-container">
        <div v-for="day in weather.forecast.forecastday" class="forecast">
          <p>{{ moments(day.date) }}</p>
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
          "http://api.apixu.com/v1/forecast.json?key=0c7610c80c8e4fc78e3150630191903&q=tempelhof&days=7"
        )
        .then(res => {
          this.weather = res.data;
          console.log(this.weather);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  data() {
    return {
      weather: {}
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
  background-color: rgb(126, 126, 126);
  border-radius: 5px;
}
.forecast {
  padding: 5px;
  margin: 5px;
  text-align: center;
  background-color: rgb(79, 78, 78);
  border-radius: 5px;
}
.forecast-container {
  display: flex;
}
.current {
  height: 100px;
  width: 100px;
}
.forecast p {
}
</style>
