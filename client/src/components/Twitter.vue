<template>
  <div v-if="loaded" class="twitter">
    <a href="https://twitter.com/DevinCow">
      <div class="tweet" v-if="tweets.bigBen">
        <img :src="tweets.bigBen[0].user.profile_image_url" alt="" />
        <p>{{ tweets.bigBen[0].text }}</p>
      </div>
    </a>

    <a href="https://twitter.com/nytimes">
      <div class="tweet" v-if="tweets.nytimes">
        <img :src="tweets.nytimes[0].user.profile_image_url" alt="" />
        <p>{{ tweets.nytimes[0].text }}</p>
      </div>
    </a>
  </div>
  <div v-else class="twitter">
    <div class="container-not-loaded">
      <div class="lds-loading">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Twitter",
  props: {},
  data() {
    return {
      loaded: false,
      tweets: {}
    };
  },
  methods: {
    randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    getTweets() {
      axios
        .get("/api/twitter/user")
        .then(res => {
          this.tweets = res.data;
        })
        .then(() => {
          this.loaded = true;
        })
        .catch(err => {
          this.loaded = false;
        });
    }
  },
  created() {
    this.getTweets();
  }
};
</script>

<style scoped>
.twitter {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
img {
  height: 70px;
  width: 70px;
}

.tweet {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: white;
  width: 90%;
  margin-left: 5%;
  border-radius: 5px;
}

.tweet p {
  width: 70%;
  font-size: 1em;
}
a:link {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
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
