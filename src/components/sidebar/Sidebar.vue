<template>
  <aside>
    <degrees-monitor />
  </aside>
</template>

<script>
import DegreesMonitor from "@/components/sidebar/DegreesMonitor";

export default {
  name: "Sidebar",

  components:{
    DegreesMonitor
  },

  async beforeMount() {
    await this.$store.dispatch('getPosition');
  },

}
</script>

<style scoped lang="scss">

</style>