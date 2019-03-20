<template>
  <div v-if="weather.current" class="weather">
    <img class="current" :src="weather.current.condition.icon" alt="" />
    <img
      class="forecast"
      v-for="day in weather.forecast.forecastday"
      :src="day.day.condition.icon"
    />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Weather",
  props: {},
  methods: {
    getWeather() {
      axios
        .get(
          "http://api.apixu.com/v1/forecast.json?key=0c7610c80c8e4fc78e3150630191903&q=tempelhof&days=4"
        )
        .then(res => {
          console.log("weather checked");
          this.weather = res.data;
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
      this.getPosition();
    }, 60000);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
