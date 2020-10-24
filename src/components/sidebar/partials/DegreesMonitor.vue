<template>
  <div v-if="!isLoading" class="monitor">
    <current-temperature />
    <extend-temperature />
    <date-info />
    <position-info />
  </div>
  <div v-else class="monitor--loading">
    <spring-spinner :animation-duration="3000" :size="60" color="#ffffff" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { objectIsEmpty } from "@/utils/check-helper";

import { SpringSpinner } from "epic-spinners";
import CurrentTemperature from "@/components/sidebar/partials/_partial/CurrentTemperature";
import ExtendTemperature from "@/components/sidebar/partials/_partial/ExtendTemperature";
import DateInfo from "@/components/sidebar/partials/_partial/DateInfo";
import PositionInfo from "@/components/sidebar/partials/_partial/PositionInfo";

export default {
  name: "DegreesMonitor",

  components: {
    CurrentTemperature,
    ExtendTemperature,
    DateInfo,
    PositionInfo,
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
  grid-template-rows: 3fr 1fr 1fr 2fr;
  grid-template-columns: 1fr;
  padding: 10px;
}

.monitor--loading {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
