<template>
  <section class="chart__wrapper">
    <line-chart
      v-if="loaded"
      :chartdata="chartData"
      :options="chartOptions"
      :styles="chartStyles"
    />
  </section>
</template>

<script>
import { mapGetters } from "vuex";

import LineChart from "@/components/charts/Line";

export default {
  name: "HourlyForecast",

  components: {
    LineChart
  },

  computed: {
    ...mapGetters("forecast", ["hourlyForecast"]),

    loaded() {
      return !!this.hourlyForecast.length;
    },

    chartData() {
      return {
        labels: this.labelsData,
        datasets: [
          {
            label: "Hourly",
            data: this.tempsData,
            backgroundColor: "#4d9ac51a",
            borderColor: "#8bb0e2",
            borderWidth: 2
          }
        ]
      };
    },

    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false
      };
    },

    chartStyles() {
      return {
        height: "500px",
        width: "100%",
        position: "relative"
      };
    },

    labelsData() {
      return this.hourlyForecast.map(hourItem => hourItem.dt);
    },

    tempsData() {
      return this.hourlyForecast.map(hourItem => hourItem.temp);
    }
  }
};
</script>

<style scoped lang="scss">
//.chart__wrapper {
//  max-width: 100%;
//}
</style>
