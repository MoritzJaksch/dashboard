<template>
  <div v-if="loaded" class="departure-container">
    <div class="subway-container">
      <div v-for="departure in subway">
        <p>
          {{ departure.line.name }} nach {{ departure.direction }}
          {{ moments(departure.when) }}
        </p>
      </div>
      <p></p>
    </div>
    <div class="train-container">
      <div v-for="departure in train">
        <p>
          {{ departure.line.name }} nach {{ departure.direction }}
          {{ moments(departure.when) }}
        </p>
      </div>
      <p></p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "PublicTransport",
  props: {},
  data() {
    return {
      subway: [],
      train: [],
      loaded: false
    };
  },
  methods: {
    moments(date) {
      return moment(date).fromNow();
    }
  },
  created() {
    axios
      .get(
        "https://1.bvg.transport.rest/stations/900000068201/departures?when=now"
      )
      .then(departures => {
        this.subway = departures.data.filter(departure => {
          return departure.line.symbol == "U";
        });
        this.train = departures.data.filter(departure => {
          return departure.line.symbol == "S";
        });
        this.loaded = true;
      })
      .catch(err => {
        console.log(err);
        this.loaded = false;
      });
  },
  mounted() {},
  updated() {}
};
</script>

<style scoped>
.image-nasa  {
  height: 500px;
  width: 500px;
}
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
