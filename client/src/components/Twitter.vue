<template>
  <div class="Twitter">
    <a href="https://twitter.com/big_ben_clock">
      <div class="big-ben" v-if="tweets.bigBen">
        <img :src="tweets.bigBen[0].user.profile_image_url" alt="" />
        <p>{{ tweets.bigBen[0].text }}</p>
      </div>
    </a>

    <a href="https://twitter.com/nytimes">
      <div class="ny-times" v-if="tweets.nytimes">
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
