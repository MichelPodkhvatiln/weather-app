<template>
  <aside class="sidebar">
    <div></div>
    <degrees-monitor />
  </aside>
</template>

<script>
import DegreesMonitor from "@/components/sidebar/DegreesMonitor";

export default {
  name: "Sidebar",

  components: {
    DegreesMonitor
  },

  async beforeMount() {
    await this.$store.dispatch("getPosition");
  }
};
</script>

<style scoped lang="scss">
.sidebar {
  display: grid;
  grid-template-rows: 1fr 2fr 1fr;
  grid-template-columns: 1fr;
  color: whitesmoke;
  background-color: #4d9ac5;
  background-image: linear-gradient(0deg, #4d9ac5 0%, #8bb0e2 100%);
}
</style>