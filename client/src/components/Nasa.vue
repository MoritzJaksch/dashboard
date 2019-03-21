<template>
  <div class="NASA">
    <img class="image-nasa" v-if="loaded" :src="picture" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Nasa",
  props: {},
  data() {
    return {
      pictures: [],
      picture: "",
      loaded: false
    };
  },
  methods: {
    randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    getRandomPicture() {
      let rnd = this.randomNumber(0, 24);
      this.picture = this.pictures[rnd]["img_src"];
    },
    getPicture() {
      axios
        .get("http://localhost:5000/api/nasa")
        .then(res => {
          console.log("NASA STUFF: ", res.data);
          this.pictures = res.data.photos;
        })
        .then(() => {
          console.log("this.pictures: ", this.pictures);
          this.getRandomPicture();
          this.loaded = true;
        });
    }
  },
  created() {
    this.getPicture();
    setInterval(() => {
      this.getRandomPicture();
    }, 10000);
  },
  mounted() {},
  updated() {}
};
</script>

<style scoped>
img {
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
