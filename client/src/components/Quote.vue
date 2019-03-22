<template>
  <div class="quote">
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
.quote {
  height: 100%;
  width: 100%;
  background-color: rgb(126, 126, 126);
  border-radius: 5px;
}
p {
  margin: 0;
}
</style>
