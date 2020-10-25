<template>
  <line-chart
    v-if="loaded"
    :chart-data="chartData"
    :options="chartOptions"
    :styles="chartStyles"
  />
</template>

<script>
import LineChart from "@/components/charts/LineChart.vue";
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "HourlyTempChart",
  components: {
    LineChart
  },

  props: {
    mode: String
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
      const dataLength = this.mode === "one-day" ? 26 : 47;

      return data.slice(1, dataLength);
    },

    tempsData() {
      const data = this.hourlyForecast.map(hourItem => hourItem.temp);
      const dataLength = this.mode === "one-day" ? 26 : 47;

      return data.slice(1, dataLength);
    }
  }
};
</script>

<style scoped></style>
