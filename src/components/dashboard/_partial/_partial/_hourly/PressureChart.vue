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
  name: "PressureChart",
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
            label: "Pressure",
            data: this.tempsData,
            backgroundColor: "#a54dc51a",
            borderColor: "#a54dc5",
            borderWidth: 3,
            pointBackgroundColor: "#a54dc5",
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
      const data = this.hourlyForecast.map(hourItem => hourItem.pressure);
      const dataLength = this.mode === "one-day" ? 26 : 47;

      return data.slice(1, dataLength);
    }
  }
};
</script>

<style scoped></style>
