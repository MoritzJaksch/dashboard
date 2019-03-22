<template>
  <div v-if="loaded" class="meetup-container">
    <div class="meetup" v-for="meetup in meetups">
      <a :href="meetup.link">
        <p>What: {{ meetup.name }}</p>
        <p>Where: {{ meetup.venue.name }}</p>
        <p>Who: {{ meetup.group.name }}</p>
      </a>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Meetup",
  props: {},
  data() {
    return {
      meetups: {},
      loaded: false
    };
  },
  methods: {},
  created() {
    axios
      .get("http://localhost:5000/api/meetup")
      .then(res => {
        this.meetups = res.data;
      })
      .then(() => {
        this.loaded = true;
        console.log("meetup: ", this.meetups);
      });
  }
};
</script>

<style scoped>
.meetup-container {
  background-color: rgb(90, 88, 101);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 5px;
}

.meetup {
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: rgb(159, 153, 161);
  width: 95%;
  border-radius: 5px;
}
</style>
