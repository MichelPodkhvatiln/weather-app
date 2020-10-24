<template>
  <section class="dashboard">
    <hourly-forecast />
  </section>
</template>

<script>
import HourlyForecast from "@/components/dashboard/_partial/HourlyForecast";

export default {
  name: "Dashboard",

  components: {
    HourlyForecast
  }
};
</script>

<style scoped lang="scss">
.dashboard {
  display: grid;
  grid-template-rows: 1fr 5fr;
  grid-template-columns: 1fr;
  overflow-y: scroll;
}
</style>
