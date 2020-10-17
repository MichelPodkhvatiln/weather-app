<template>
  <div class="monitor">
    <template v-if="!loading">
      <current-temperature />
      <temperature />
    </template>
    <template v-else>
      <spring-spinner :animation-duration="3000" :size="60" color="#ffffff" />
    </template>
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

    loading() {
      return objectIsEmpty(this.currentForecast);
    }
  }
};
</script>

<style scoped lang="scss">
.monitor {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  padding: 10px;
}
</style>
