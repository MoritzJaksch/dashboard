<template>
  <div class="quote">
    <div class="loaded" v-if="this.loaded">
      <p class="author">{{ this.quote.author }} once said:</p>
      <p class="qod">{{ this.quote.quote }}</p>
    </div>
    <div class="loaded" v-else>
      <p class="author">Computer says:</p>
      <p class="qod">No.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Quote",
  props: {},
  data() {
    return {
      quote: {},
      loaded: false
    };
  },
  methods: {},
  created() {
    axios
      .get("http://quotes.rest/qod.json")
      .then(res => {
        this.quote = res.data.contents.quotes[0];
      })
      .then(() => {
        this.loaded = true;
        console.log("QUOTES: ", this.quote);
      });
  },
  mounted() {},
  updated() {}
};
</script>

<style scoped>
p {
  margin: 4%;
  padding: 4%;
  background-color: white;
  border-radius: 5px;
}

.author {
  height: 15%;
  width: 90%;
  font-weight: bold;
}
.qod {
  height: 75%;
  width: 90%;
  font-weight: bolder;
}

.loaded {
  height: 100%;
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
</style>
