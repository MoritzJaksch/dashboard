<template>
  <div class="departure-container">
    <div v-if="loaded" class="loaded">
      <div class="title-container">
        <p>Abfahrten S+U Tempelhof</p>
      </div>
      <div class="subway-container">
        <div v-for="departure in subway">
          <p>
            <b>{{ departure.line.name }} nach {{ departure.direction }}</b
            ><br />
            {{ moments(departure.when) }}
          </p>
        </div>
      </div>
      <div class="train-container">
        <div v-for="departure in train">
          <p>
            <b>{{ departure.line.name }} nach {{ departure.direction }}</b
            ><br />
            {{ moments(departure.when) }}
          </p>
        </div>
      </div>
    </div>
    <div v-else class="loaded">
      <div class="title-container">
        <p>Abfahrten S+U Tempelhof</p>
      </div>

      <div class="subway-container">
        <div>
          <p>
            Momentan ist leider keine Auskunft verfügbar
          </p>
        </div>
      </div>
      <div class="train-container">
        <div>
          <p>
            Momentan ist leider keine Auskunft verfügbar
          </p>
        </div>
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
      return moment(date)
        .locale("de")
        .fromNow();
    },
    getDepartures() {
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
          this.loaded = false;
        });
      setTimeout(this.getDepartures, 30000);
    }
  },
  created() {
    this.getDepartures();
  },
  mounted() {},
  updated() {}
};
</script>

<style scoped>
.loaded {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.subway-container {
  height: 40%;
  width: 95%;
  background-color: white;
  border-radius: 5px;
  overflow: scroll;
}
.subway-container p {
  margin-left: 4%;
}

.train-container {
  height: 40%;
  width: 95%;
  background-color: white;
  border-radius: 5px;
  overflow: scroll;
}
.train-container p {
  margin-left: 4%;
}

.title-container {
  height: 10%;
  width: 95%;
  background-color: white;
  border-radius: 5px;
  text-align: center;
  font-size: 1.1em;
  font-weight: bold;
}
.title-container p {
  margin-top: 10px;
}
</style>
