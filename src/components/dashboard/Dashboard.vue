<template>
  <section class="dashboard">
    <navbar :activeChart="activeChart" @selectTab="changeChart" />
    <section>
      <hourly-forecast v-if="activeChart === 'hourly'" />
      <daily-forecast v-if="activeChart === 'daily'" />
    </section>
  </section>
</template>

<script>
import Navbar from "@/components/dashboard/_partial/Navbar.vue";
import HourlyForecast from "@/components/dashboard/_partial/HourlyForecast.vue";
import DailyForecast from "@/components/dashboard/_partial/DailyForecast.vue";

export default {
  name: "Dashboard",

  data() {
    return {
      activeChart: "hourly"
    };
  },

  components: {
    Navbar,
    HourlyForecast,
    DailyForecast
  },

  methods: {
    changeChart(value) {
      this.activeChart = value;
    }
  }
};
</script>

<style scoped lang="scss">
.dashboard {
  display: grid;
  grid-template-rows: 100px 1fr;
  grid-template-columns: 1fr;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
