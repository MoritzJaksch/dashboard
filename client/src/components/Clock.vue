<template>
  <div class="time">
    <p>{{ time }}</p>
    <p>{{ day }}</p>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "Clock",
  props: {},
  data() {
    return {
      time: "",
      day: ""
    };
  },
  methods: {
    getTime() {
      this.time = moment()
        .locale("de")
        .format("LTS");
      setTimeout(this.getTime, 1000);
    },
    getDay() {
      this.day = moment()
        .locale("de")
        .format("L");
    }
  },
  created() {
    this.getDay();
    this.getTime();
  },
  mounted() {},
  updated() {}
};
</script>

<style scoped>
.time {
  font-size: 3em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.time p:nth-child(odd) {
  font-weight: bold;
}
</style>
