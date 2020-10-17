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
  grid-template-rows: 1fr 5fr;
  grid-template-columns: 1fr;
  padding: 10px;
  min-width: 320px;
  color: whitesmoke;
  background-color: #4d9ac5;
  background-image: linear-gradient(0deg, #4d9ac5 0%, #8bb0e2 100%);
}
</style>
