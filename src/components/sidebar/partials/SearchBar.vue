<template>
  <div>
    <input
      type="text"
      name="searchLocation"
      v-model="address"
      placeholder="Enter location..."
    />
    <button @click="search">
      <i class="fas fa-search" />
    </button>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      address: ""
    };
  },
  methods: {
    search() {
      this.$store.dispatch("getInfo", this.address);
    }
  }
};
</script>

<style scoped></style>
