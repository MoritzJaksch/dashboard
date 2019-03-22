<template>
  <div class="nasa">
    <div v-if="loaded" class="loaded">
      <div class="title">
        <p>Mars Rover Cam</p>
      </div>
      <div class="info-container">
        <div>
          <p>Rover:</p>
          <p>{{ picture.rover.name }}</p>
        </div>
        <div>
          <p>Camera:</p>
          <p>{{ picture.camera.name }}</p>
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
    <div v-else class="not-loaded">
      <div class="title">
        <p>something went wrong...</p>
      </div>
      <div class="info-container">
        <div>
          <p>Rover:</p>
          <p>...</p>
        </div>
        <div>
          <p>Camera:</p>
          <p>...</p>
        </div>
        <div>
          <p>Date:</p>
          <p>...</p>
        </div>
        <div>
          <p>Sol:</p>
          <p>...</p>
        </div>
      </div>
      <div class="image-container">
        <img
          class="image-nasa"
          src="https://media.giphy.com/media/z0tTiODyfJmYo/giphy.gif"
        />
      </div>
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
        .get("/api/nasa")
        .then(res => {
          console.log("NASA STUFF: ", res.data);
          this.pictures = res.data.photos;
        })
        .then(() => {
          console.log("this.pictures: ", this.pictures);
          this.getRandomPicture();
          this.loaded = true;
        })
        .catch(err => {
          this.loaded = false;
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
  grid-area: 2/2/3/3;
  width: 100%;
  height: 100%;
}
.info-container {
  grid-area: 2 / 1 / 3 / 2;
  width: 100%;
  height: 100%;
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
.title {
  grid-area: 1/1/2/3;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  font-size: 1.2em;
}
.title p {
  margin: 0 auto;
}

.loaded {
  height: 90%;
  width: 95%;
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 10% 90%;
  grid-gap: 2%;
}
.not-loaded {
  height: 90%;
  width: 95%;
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 10% 90%;
  grid-gap: 2%;
}

.nasa {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.widget-container {
  /* height: 100%;
  display: grid;
  grid-template-rows: 10% 90%; */
}
</style>
