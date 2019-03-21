<template>
  <div v-if="loaded" class="meetup-container">
    <div class="meetup" v-for="meetup in meetups">
      <div>
        <a :href="meetup.link">
          <p>What: {{ meetup.name }}</p>
          <p>Where: {{ meetup.venue.name }}</p>
          <p>Who: {{ meetup.group.name }}</p>
        </a>
      </div>
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
