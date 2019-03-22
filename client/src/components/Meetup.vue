<template>
  <div class="meetup-container">
    <div v-if="loaded" class="loaded">
      <div class="infobox">
        Meetups in Berlin:
      </div>
      <div class="meetup" v-for="meetup in meetups">
        <a :href="meetup.link">
          <p><b>What:</b> {{ meetup.name }}</p>
          <p><b>Where:</b> {{ meetup.venue.name }}</p>
          <p><b>Who:</b> {{ meetup.group.name }}</p>
          <p>
            <b>When:</b>
            {{ getDate(meetup["local_date"], meetup["local_time"]) }}
          </p></a
        >
      </div>
    </div>
    <div v-else class="loaded"></div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "Meetup",
  props: {},
  data() {
    return {
      meetups: {},
      loaded: false
    };
  },
  methods: {
    getDate(date, time) {
      return moment(`${date} ${time}`)
        .locale("de")
        .format("llll");
    }
  },
  created() {
    axios
      .get("http://localhost:5000/api/meetup")
      .then(res => {
        this.meetups = res.data;
      })
      .then(() => {
        this.loaded = true;
        console.log("meetup: ", this.meetups);
      })
      .then(() => {
        let now = moment("2019-03-26 18:30")
          .locale("de")
          .format("llll");
        console.log("time in now: ", now);
      });
  }
};
</script>

<style scoped>
p {
  margin: 0 3% 0 3%;
}
.meetup-container {
  background-color: rgb(90, 88, 101);
  height: 100%;
  width: 100%;
  border-radius: 5px;
}
.loaded {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 5px;
}

.meetup {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: rgb(159, 153, 161);
  height: 20%;
  width: 95%;
  border-radius: 5px;
}

.infobox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: rgb(159, 153, 161);
  height: 10%;
  width: 95%;
  border-radius: 5px;
}

a:link {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
