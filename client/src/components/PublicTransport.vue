<template>
  <div class="departure-container">
    <div v-if="loaded" class="loaded">
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
    <div v-else class="loaded">
      <div class="subway-container">
        <div>
          <p>
            Momentan ist leider keine Auskunft verfügbar
          </p>
        </div>
        <p></p>
      </div>
      <div class="train-container">
        <div>
          <p>
            Momentan ist leider keine Auskunft verfügbar
          </p>
        </div>
        <p></p>
      </div>
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
.departure-container {
  background-color: rgb(125, 125, 125);
  height: 100%;
  width: 100%;
  border-radius: 5px;
}
.loaded {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.subway-container {
  height: 45%;
  width: 90%;
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
}
.train-container {
  height: 45%;
  width: 90%;
  background-color: white;
  border-radius: 5px;
  overflow: scroll;
}
</style>
