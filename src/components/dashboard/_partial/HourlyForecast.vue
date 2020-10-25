<template>
  <section class="hourly-section">
    <nav class="hourly-section__navbar">
      <span class="hourly-section__navbar--title">
        Forecast for:
      </span>
      <button
        class="hourly-section__navbar--button"
        :class="activeOneDayClasses"
        @click.prevent="changeMode('one-day')"
      >
        Day
      </button>
      <button
        class="hourly-section__navbar--button"
        :class="activeTwoDaysClasses"
        @click.prevent="changeMode('two-days')"
      >
        Two days
      </button>
    </nav>

    <article class="chart__wrapper">
      <div class="chart">
        <hourly-temp-chart :mode="mode" />
      </div>
      <div class="chart">
        <humidity-chart :mode="mode" />
      </div>
      <div class="chart">
        <pressure-chart :mode="mode" />
      </div>
    </article>
  </section>
</template>

<script>
import HourlyTempChart from "@/components/dashboard/_partial/_partial/_hourly/HourlyTempChart.vue";
import HumidityChart from "@/components/dashboard/_partial/_partial/_hourly/HumidityChart";
import PressureChart from "@/components/dashboard/_partial/_partial/_hourly/PressureChart";

export default {
  name: "HourlyForecast",

  data() {
    return {
      mode: "one-day"
    };
  },

  components: {
    HourlyTempChart,
    HumidityChart,
    PressureChart
  },

  computed: {
    activeOneDayClasses() {
      return {
        "active-button": this.mode === "one-day"
      };
    },

    activeTwoDaysClasses() {
      return {
        "active-button": this.mode === "two-days"
      };
    }
  },

  methods: {
    changeMode(value) {
      this.mode = value;
    }
  }
};
</script>

<style scoped lang="scss">
$main: #ffffff;
$accent: #000000;

@mixin main-styling($main) {
  padding: 7px 10px;
  color: rgba($main, 0.85);
  font-size: 0.8rem;
  background-color: rgba($main, 0.2);
  border: 1px solid rgba($main, 1);
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
  }
}

@mixin on-actions-style($accent) {
  transition: all 0.3s ease-in-out;

  &:not([disabled]) {
    &:hover {
      color: rgba($main, 1);
      background: rgba($accent, 0.1);

      &::placeholder {
        color: rgba($main, 1);
      }
    }

    &:focus {
      color: rgba($main, 1);
      outline: none;
      background: rgba($accent, 0.1);

      &::placeholder {
        color: rgba($main, 1);
      }
    }
  }
}

.hourly-section {
  color: $main;
}

.hourly-section__navbar {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  height: 50px;
  background-color: #a1c9e5;
}

.hourly-section__navbar--title {
  margin-right: 10px;
  text-transform: uppercase;
}

.hourly-section__navbar--button {
  padding: 7px;
  min-width: 100px;
  @include main-styling($main);
  @include on-actions-style($accent);
}

.active-button {
  background-color: rgba($accent, 0.1);
}

.hourly-section__navbar--button + .hourly-section__navbar--button {
  margin: 10px;
}

.chart__wrapper {
  padding: 10px 40px;
}

.chart {
  margin-bottom: 20px;
}
</style>
