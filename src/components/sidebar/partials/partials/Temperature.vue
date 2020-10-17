<template>
  <div class="temperature">
    <div class="grade-temp">
      <div class="grade-temp__item">
        <span class="grade-temp__item--value">
          <i class="fas fa-temperature-low" />

          {{ currentExtendedTemp.min | rounded }}
        </span>
        <span class="grade-temp__item--units">
          °C
        </span>
      </div>
      <div class="grade-temp__item">
        <span class="grade-temp__item--value">
          <i class="fas fa-temperature-high" />

          {{ currentExtendedTemp.max | rounded }}
        </span>
        <span class="grade-temp__item--units">
          °C
        </span>
      </div>
    </div>
    <div>
      <i class="far fa-calendar-alt" />
      {{ currentDateTime }}
    </div>
    <div>
      <i class="fas fa-map-marker-alt" />
      {{ address }}
      {{ coords }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Temperature",

  computed: {
    ...mapGetters("forecast", [
      "currentExtendedTemp",
      "currentWeatherDescr",
      "currentDateTime"
    ]),

    ...mapGetters("geocoding", ["address", "coords"])
  },

  filters: {
    rounded(value) {
      return value.toFixed();
    }
  }
};
</script>

<style scoped lang="scss">
.temperature {
  display: grid;
  grid-template-rows: 100px 50px 50px;
  grid-template-columns: 1fr;
}

.grade-temp {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 1.25rem;
}

.grade-temp__item {
  display: flex;
  justify-content: center;
}

.grade-temp__item--value {
  display: flex;
  align-items: center;
  line-height: 1;

  svg {
    margin-right: 5px;
  }
}
</style>
