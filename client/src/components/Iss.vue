<template>
  <div class="iss">
    <p>{{ issPosition }}</p>
    <div id="map" class="map"></div>
  </div>
</template>

<script>
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "Iss",
  props: {},
  methods: {
    getPosition() {
      axios
        .get("http://api.open-notify.org/iss-now.json")
        .then(response => {
          this.issPosition = response.data.iss_position;
        })
        .catch(err => {
          console.log("error in ISS axios: ", err);
        });
    }
  },
  data() {
    return {
      issPosition: { latitude: 0, longitude: 0 }
    };
  },
  created() {
    this.getPosition();
    setInterval(() => {
      this.getPosition();
    }, 5000);
  },
  mounted() {
    let vm = this;

    this.map = L.map("map", {
      zoomControl: false,
      center: [51.505, -0.09],
      zoom: 2
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
      {
        detectRetina: true,
        ext: "png"
      }
    ).addTo(this.map);

    this.myIcon = L.icon({
      iconUrl: "http://open-notify.org/Open-Notify-API/map/ISSIcon.png",
      iconSize: [50, 50],
      iconAnchor: [25, 25],
      popupAnchor: [-3, -76]
    });
    this.marker = L.marker(
      [vm.issPosition.latitude, vm.issPosition.longitude],
      {
        icon: this.myIcon
      }
    ).addTo(this.map);
  },
  updated() {
    let vm = this;
    this.marker.setLatLng([vm.issPosition.latitude, vm.issPosition.longitude]);
    this.map.panTo([vm.issPosition.latitude, vm.issPosition.longitude]);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map {
  height: 500px;
  width: 500px;
  border-radius: 5px;
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
