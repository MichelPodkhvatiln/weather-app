<template>
  <div class="monitor">
    <template v-if="!loading">
      <temperature />
    </template>
    <template v-else>
      <h1>Loading...</h1>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { objectIsEmpty } from "@/utils/check-helper";

import Temperature from "@/components/sidebar/partial/Temperature";

export default {
  name: "DegreesMonitor",
  components: {
    Temperature
  },
  computed: {
    ...mapGetters(["currentForecast"]),
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
