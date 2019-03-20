<template>
  <div class="NASA">
    <p>NASA STUFF</p>
    <img v-if="pictures[0].img_source" :src="pictures[0].img_source" alt="" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Nasa",
  props: {},
  methods: {
    randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    getPicture() {
      axios.get("http://localhost:5000/api/nasa").then(res => {
        console.log("NASA STUFF: ", res);
        this.pictures = res.data.photos;
      });
    }
  },
  data() {
    return {
      pictures: {}
    };
  },
  created() {
    this.getPicture();
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
