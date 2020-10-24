<template>
  <div class="extend-temperature">
    <div class="extend-temperature__item">
      <p class="extend-temperature__item--value">
        <i class="fas fa-temperature-low" />

        {{ currentExtendedTemp.min | rounded }}

        <span v-if="units === 'metric'">
          &deg;C
        </span>
        <span v-if="units === 'imperial'">
          &deg;F
        </span>
      </p>
    </div>
    <div class="extend-temperature__item">
      <p class="extend-temperature__item--value">
        <i class="fas fa-temperature-high" />

        {{ currentExtendedTemp.max | rounded }}

        <span v-if="units === 'metric'">
          &deg;C
        </span>
        <span v-if="units === 'imperial'">
          &deg;F
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ExtendTemperature",

  computed: {
    ...mapGetters("forecast", ["units", "currentExtendedTemp"])
  },

  filters: {
    rounded(value) {
      return value.toFixed();
    }
  }
};
</script>

<style scoped lang="scss">
.extend-temperature {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.extend-temperature__item {
  margin: 5px;
}

.extend-temperature__item--value {
  font-size: 1.35rem;
  opacity: 0.85;
}
</style>
