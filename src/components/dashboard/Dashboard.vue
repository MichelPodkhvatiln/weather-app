<template>
  <section class="dashboard">
    <hourly-forecast />
    <daily-forecast />
    <daily-forecast />
    <daily-forecast />
  </section>
</template>

<script>
import HourlyForecast from "@/components/dashboard/_partial/HourlyForecast";
import DailyForecast from "@/components/dashboard/_partial/DailyForecast";

export default {
  name: "Dashboard",

  components: {
    HourlyForecast,
    DailyForecast
  }
};
</script>

<style scoped lang="scss">
.dashboard {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
}
</style>
