<template>
  <div class="temperature">
    <div class="current-temp">
      <span class="current-temp__value">
        {{ currentExtendedTemp.current | rounded }}
      </span>
      <strong class="current-temp__units">
        °C
      </strong>
    </div>
    <div v-if="currentWeatherDescr" class="weather-descr">
      <strong
        v-for="info in currentWeatherDescr"
        :key="info.main"
        class="weather-descr--note"
      >
        {{ info.main }}
      </strong>
    </div>
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

.current-temp {
  display: flex;
  justify-content: center;
}

.current-temp__value {
  font-size: 4.5rem;
}

.current-temp__units {
  font-size: 2.5rem;
}

.weather-descr {
  display: flex;
  justify-content: space-around;
  font-size: 1rem;
}

.weather-descr--note {
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
