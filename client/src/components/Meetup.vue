<template>
  <div class="meetup-container">
    <div v-if="loaded" class="loaded">
      <div class="infobox">
        MEETUPS IN BERLIN:
      </div>
      <div class="meetup" v-for="meetup in meetups">
        <a :href="meetup.link">
          <p class="title">
            {{ meetup.name }}
          </p>
          <p><b>Where:</b> {{ meetup.venue.name }}</p>
          <p><b>Who:</b> {{ meetup.group.name }}</p>
          <p>
            <b>When:</b>
            {{ getDate(meetup["local_date"], meetup["local_time"]) }}
          </p></a
        >
      </div>
    </div>
    <div v-else class="loaded">
      <div class="infobox">
        No connection...
      </div>
      <div class="meetup" v-for="i in 4">
        <div class="container-not-loaded">
          <div class="lds-loading">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
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
      .get("/api/meetup")
      .then(res => {
        this.meetups = res.data;
      })
      .then(() => {
        this.loaded = true;
      })
      .catch(err => {
        this.loaded = false;
      });
  }
};
</script>

<style scoped>
p {
  margin: 0 3% 0 3%;
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
  min-width: 245px;
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
  color: white;
  font-size: 1.5em;
  font-weight: bold;
}

.title {
  font-size: 1.1em;
  font-weight: bold;
  color: white;
}
p {
  color: lightgrey;
}

a:link {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
  color: white;
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
