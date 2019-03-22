<template>
  <div class="nasa">
    <div class="widget-container">
      <div class="title">
        <p>Mars Rover Cam</p>
      </div>
      <div v-if="loaded" class="loaded">
        <div class="info-container">
          <div>
            <p>Rover:</p>
            <p>{{ picture.rover.name }}</p>
          </div>
          <div>
            <p>Camera:</p>
            <p>{{ picture.camera["full_name"] }}</p>
          </div>
          <div>
            <p>Date:</p>
            <p>{{ picture["earth_date"] }}</p>
          </div>
          <div>
            <p>Sol:</p>
            <p>{{ picture.sol }}</p>
          </div>
        </div>
        <div class="image-container">
          <img class="image-nasa" :src="picture['img_src']" />
        </div>
      </div>
      <div v-else class="not-loaded"></div>
    </div>
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
      this.picture = this.pictures[rnd];
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
  height: 100%;
  width: 100%;
  border-radius: 5px;
  object-fit: cover;
}
.image-container {
  width: 70%;
  height: 90%;
}
.info-container {
  width: 20%;
  height: 90%;
  border-radius: 5px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.info-container div {
  width: 90%;
}

.info-container div p:nth-child(odd) {
  font-weight: bold;
}

.loaded {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.not-loaded {
  height: 100%;
  width: 100%;
}

.nasa {
  display: flex;
  justify-content: center;
  align-items: center;
}

.widget-container {
  height: 100%;
  display: grid;
  grid-template-rows: 10% 90%;
}
</style>
