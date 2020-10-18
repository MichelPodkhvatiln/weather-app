<template>
  <div class="position-info__wrapper">
    <div v-if="isReadyToShow" class="position-info">
      <div class="position-info__address">
        <span class="position-info__address--icon">
          <i class="fas fa-map-marker-alt" />
        </span>

        <p>{{ address }}</p>
      </div>
      <div class="position-info__coords">
        <p>Lat: {{ coords.lat | rounded }} <span>&deg;N</span></p>
        <p>Long: {{ coords.lon | rounded }} <span>&deg;W</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { objectIsEmpty } from "@/utils/check-helper";

export default {
  name: "PositionInfo",

  computed: {
    ...mapGetters("geocoding", ["address", "coords"]),

    isReadyToShow() {
      return this.address !== "" && !objectIsEmpty(this.coords);
    }
  },

  filters: {
    rounded(value) {
      return value.toFixed(3);
    }
  }
};
</script>

<style scoped lang="scss">
.position-info__wrapper {
  display: flex;
  justify-content: center;
}

.position-info {
  line-height: 1.3;
}

.position-info__address {
  position: relative;
  font-size: 1.2rem;
}

.position-info__address--icon {
  position: absolute;
  top: 0;
  left: -20px;
}

.position-info__coords {
  font-size: 1rem;
  opacity: 0.85;
}
</style>
