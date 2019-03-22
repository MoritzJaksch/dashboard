<template>
  <div class="iss">
    <div class="text">
      <h3>Position der ISS</h3>
      <p>Längengrad: {{ issPosition.longitude }}</p>
      <p>Breitengrad: {{ issPosition.latitude }}</p>
    </div>

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
        .get("/api/iss")
        .then(response => {
          this.issPosition = response.data.iss_position;
          this.loaded = true;
        })
        .catch(err => {
          this.loaded = false;
          console.log("error in ISS axios: ", err);
        });
    }
  },
  data() {
    return {
      issPosition: { latitude: 0, longitude: 0 },
      loaded: false
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
      iconUrl: "https://moritzjaksch.com/stuff/ISS_red.png",
      iconSize: [70, 70],
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
h3 {
  width: 50%;
}
p {
  width: 50%;
  bottom: 1%;
}
.map {
  min-height: 300px;
  height: 100%;
  width: 100%;
  border-radius: 5px;
}

.text {
  left: 4%;
  width: 100%;
  z-index: 500;
  position: absolute;
}
.iss {
  position: relative;
}
</style>
