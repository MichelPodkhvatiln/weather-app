<template>
  <section class="daily-section">
    <nav class="daily-section__navbar">
      <span class="daily-section__navbar--title">
        Daily forecast
      </span>
    </nav>
    <article class="chart__wrapper">
      <line-chart
        v-if="loaded"
        :chart-data="chartData"
        :options="chartOptions"
        :styles="chartStyles"
      />
    </article>
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
      const dataWithoutToday = this.dailyForecast.slice(1);
      return dataWithoutToday.map(hourItem =>
        moment(hourItem.dt).format("DD MMMM")
      );
    },

    minTempsData() {
      const dataWithoutToday = this.dailyForecast.slice(1);
      return dataWithoutToday.map(hourItem => hourItem.temp.min.toFixed());
    },

    maxTempsData() {
      const dataWithoutToday = this.dailyForecast.slice(1);
      return dataWithoutToday.map(hourItem => hourItem.temp.max.toFixed());
    }
  }
};
</script>

<style scoped lang="scss">
$main: #ffffff;

.daily-section {
  color: $main;
}

.daily-section__navbar {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  height: 50px;
  background-color: #a1c9e5;
}

.daily-section__navbar--title {
  margin-right: 10px;
  text-transform: uppercase;
}

.hourly-section__navbar--button + .hourly-section__navbar--button {
  margin: 10px;
}

.chart__wrapper {
  padding: 10px 40px;
}
</style>
