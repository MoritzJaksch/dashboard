<template>
  <div class="Quote">
    <div v-if="this.loaded">
      <p>{{ this.quote.author }} said:</p>
      <p>{{ this.quote.quote }}</p>
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
