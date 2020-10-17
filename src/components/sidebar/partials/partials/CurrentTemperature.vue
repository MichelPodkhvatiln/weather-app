<template>
  <div class="current-temperature">
    <div class="current-temperature__monitor">
      <span class="current-temperature__monitor--value">
        {{ currentExtendedTemp.current | rounded }}
      </span>
      <button class="current-temperature__monitor--units" @click="changeUnits">
        <span v-if="units === 'metric'">
          °C
        </span>
        <span v-if="units === 'imperial'">
          °F
        </span>
      </button>
    </div>
    <div v-if="currentWeatherDescr" class="current-temperature__descr">
      <strong
        v-for="info in currentWeatherDescr"
        :key="info.main"
        class="current-temperature__descr--note"
      >
        {{ info.main }}
      </strong>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CurrentTemperature",

  computed: {
    ...mapGetters("forecast", [
      "units",
      "currentExtendedTemp",
      "currentWeatherDescr"
    ])
  },

  methods: {
    ...mapActions("forecast", ["changeUnits"])
  },

  filters: {
    rounded(value) {
      return value.toFixed();
    }
  }
};
</script>

<style scoped lang="scss">
$main: #ffffff;
$accent: #000000;

.current-temperature {
  display: flex;
  flex-direction: column;
}

.current-temperature__monitor {
  display: flex;
  justify-content: center;
  align-items: start;
}

.current-temperature__monitor--value {
  font-size: 5.25rem;
}

.current-temperature__monitor--units {
  margin: 0 5px;
  padding: 5px;
  min-width: 60px;
  color: $main;
  font-size: 2.5rem;
  background-color: transparent;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: rgba($accent, 0.1);
  }

  &:focus {
    outline: none;
    background-color: rgba($accent, 0.1);
  }
}

.current-temperature__descr {
  display: flex;
  justify-content: space-around;
  font-size: 1rem;
}
</style>
