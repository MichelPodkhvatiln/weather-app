<template>
  <div v-if="!isLoading" class="monitor">
    <current-temperature />
    <temperature />
  </div>
  <div v-else class="monitor--loading">
    <spring-spinner :animation-duration="3000" :size="60" color="#ffffff" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { objectIsEmpty } from "@/utils/check-helper";

import { SpringSpinner } from "epic-spinners";
import CurrentTemperature from "@/components/sidebar/partials/partials/CurrentTemperature";
import Temperature from "@/components/sidebar/partials/partials/Temperature.vue";

export default {
  name: "DegreesMonitor",

  components: {
    CurrentTemperature,
    Temperature,
    SpringSpinner
  },

  computed: {
    ...mapGetters("forecast", ["currentForecast"]),

    isLoading() {
      return objectIsEmpty(this.currentForecast);
    }
  }
};
</script>

<style scoped lang="scss">
.monitor {
  display: grid;
  grid-template-rows: 1fr 3fr;
  grid-template-columns: 1fr;
  padding: 10px;
}

.monitor--loading {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
