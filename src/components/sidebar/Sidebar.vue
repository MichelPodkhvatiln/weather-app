<template>
  <aside>
    Hello
  </aside>
</template>

<script>
export default {
  name: "Sidebar",

  async beforeMount() {
    await this.$store.dispatch('getPosition')
  }
}
</script>

<style scoped lang="scss">

</style>