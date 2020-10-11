<template>
  <h1 v-if="!loading">{{ currentForecast }}</h1>
  <h1 v-else>Loading...</h1>
</template>

<script>
import {mapGetters} from 'vuex';
import {objectIsEmpty} from "@/utils/check-helper";


export default {
  name: "DegreesMonitor",
  computed:{
    ...mapGetters(['currentForecast']),
    loading(){
      return objectIsEmpty(this.currentForecast)
    },
  },
}
</script>

<style scoped lang="scss">

</style>