<template>
  <aside class="sidebar">
    <search-bar />
    <degrees-monitor />
  </aside>
</template>

<script>
import { mapActions } from "vuex";

import SearchBar from "@/components/sidebar/partials/SearchBar.vue";
import DegreesMonitor from "@/components/sidebar/partials/DegreesMonitor.vue";

export default {
  name: "Sidebar",

  components: {
    DegreesMonitor,
    SearchBar
  },

  async beforeMount() {
    await this.getPosition();
  },

  methods: {
    ...mapActions("forecast", ["getPosition"])
  }
};
</script>

<style scoped lang="scss">
.sidebar {
  display: grid;
  grid-template-rows: 0.5fr 2fr 1fr;
  grid-template-columns: 1fr;
  color: whitesmoke;
  background-color: #4d9ac5;
  background-image: linear-gradient(0deg, #4d9ac5 0%, #8bb0e2 100%);
}
</style>
