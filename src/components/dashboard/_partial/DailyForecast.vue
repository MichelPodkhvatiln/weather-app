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
import moment from "moment";

import LineChart from "@/components/charts/LineChart.vue";

export default {
  name: "DailyForecast",

  components: {
    LineChart
  },

  computed: {
    ...mapGetters("forecast", ["dailyForecast"]),

    loaded() {
      return !!this.dailyForecast.length;
    },

    chartData() {
      return {
        labels: this.labelsData,
        datasets: [
          {
            label: "Min",
            data: this.minTempsData,
            borderColor: "#8bb0e2",
            borderWidth: 3,
            pointBackgroundColor: "#8bb0e2",
            pointHoverRadius: 7,
            fill: false
          },
          {
            label: "Max",
            data: this.maxTempsData,
            backgroundColor: "#e28bb81a",
            borderColor: "#e28bb8",
            borderWidth: 3,
            pointBackgroundColor: "#e28bb8",
            pointHoverRadius: 7,
            fill: "-1"
          }
        ]
      };
    },

    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        lineTension: 1,
        plugins: {
          filler: {
            propagate: true
          }
        },
        legend: {
          onClick: () => {}
        }
      };
    },

    chartStyles() {
      return {
        height: "350px",
        width: "100%",
        position: "relative"
      };
    },

    labelsData() {
      return this.dailyForecast.map(hourItem =>
        moment(hourItem.dt).format("DD MMMM")
      );
    },

    minTempsData() {
      return this.dailyForecast.map(hourItem => hourItem.temp.min.toFixed());
    },

    maxTempsData() {
      return this.dailyForecast.map(hourItem => hourItem.temp.max.toFixed());
    }
  }
};
</script>

<style scoped lang="scss">
.chart__wrapper {
  padding: 10px 40px;
}
</style>
