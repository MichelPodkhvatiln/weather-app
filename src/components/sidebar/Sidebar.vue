<template>
  <aside class="sidebar">
    <div>
      <input type="text" v-model="address" />
      <button @click="search">Search</button>
    </div>
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

  data() {
    return {
      address: ""
    };
  },

  async beforeMount() {
    await this.$store.dispatch("getPosition");
  },

  methods: {
    search(){
      this.$store.dispatch("getInfo", this.address)
    }
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
