<template>
  <div class="current-temperature">
    <div class="current-temperature__monitor">
      <span class="current-temperature__monitor--value">
        {{ currentTemp | rounded }}
      </span>
      <button class="current-temperature__monitor--units" @click="changeUnits">
        <span v-if="units === 'metric'">
          &deg;C
        </span>
        <span v-if="units === 'imperial'">
          &deg;F
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
    ...mapGetters("forecast", ["units", "currentTemp", "currentWeatherDescr"])
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
  justify-content: center;
}

.current-temperature__monitor {
  display: flex;
  justify-content: center;
  align-items: start;
  margin: 15px 0;
}

.current-temperature__monitor--value {
  font-size: 5.25rem;
}

.current-temperature__monitor--units {
  margin: 0 5px;
  padding: 5px;
  min-width: 60px;
  color: rgba($main, 0.85);
  font-size: 2.75rem;
  background-color: transparent;
  border: none;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    color: rgba($main, 1);
    background-color: rgba($accent, 0.1);
  }

  &:focus {
    color: rgba($main, 1);
    outline: none;
    background-color: rgba($accent, 0.1);
  }
}

.current-temperature__descr {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.25rem;
}
</style>
