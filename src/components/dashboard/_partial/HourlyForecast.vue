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
            label: "Hourly temperature",
            data: this.tempsData,
            backgroundColor: "#4d9ac51a",
            borderColor: "#8bb0e2",
            borderWidth: 3,
            pointBackgroundColor: "#8bb0e2",
            pointHoverRadius: 7
          }
        ]
      };
    },

    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        lineTension: 1,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              scaleLabel: {}
            }
          ]
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
      const data = this.hourlyForecast.map(hourItem =>
        moment(hourItem.dt).format("DD MMMM HH:mm")
      );

      return data.slice(1, 26);
    },

    tempsData() {
      const data = this.hourlyForecast.map(hourItem => hourItem.temp);

      return data.slice(1, 26);
    }
  }
};
</script>

<style scoped lang="scss">
.chart__wrapper {
  padding: 10px 40px;
}
</style>
