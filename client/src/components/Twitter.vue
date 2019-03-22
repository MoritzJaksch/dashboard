<template>
  <div class="twitter">
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
</template>

<script>
import axios from "axios";

export default {
  name: "Twitter",
  props: {},
  data() {
    return {
      tweets: {}
    };
  },
  methods: {
    randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    getTweets() {
      axios
        .get("http://localhost:5000/api/twitter/user")
        .then(res => {
          this.tweets = res.data;
        })
        .then(() => {
          console.log(this.tweets);
        })
        .catch(err => {
          console.log(err);
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
  background-color: rgb(115, 115, 115);
  border-radius: 5px;
  height: 100%;
  width: 100%;
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
  font-size: 1.2em;
}
</style>
