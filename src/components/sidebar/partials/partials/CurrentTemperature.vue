<template>
  <div class="current-temperature">
    <div class="current-temperature__monitor">
      <span class="current-temperature__monitor--value">
        {{ currentExtendedTemp.current | rounded }}
      </span>
      <strong class="current-temperature__monitor--units" @click="changeUnits">
        <span v-if="units === 'metric'">
          °C
        </span>
        <span v-if="units === 'imperial'">
          °F
        </span>
      </strong>
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
.current-temperature {
}
</style>
