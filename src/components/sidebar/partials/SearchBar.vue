<template>
  <form class="search-form" @submit.prevent="search">
    <input
      class="search-form__input"
      type="search"
      v-model="address"
      placeholder="Enter location..."
    />
    <button class="search-form__button" type="submit">
      <i class="fas fa-search" />
    </button>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SearchBar",

  data() {
    return {
      address: ""
    };
  },

  methods: {
    ...mapActions("geocoding", ["getInfo"]),

    search() {
      this.getInfo(this.address);
    }
  }
};
</script>

<style scoped lang="scss">
$main: #ffffff;

.search-form {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-form__input {
  padding: 5px 10px;
  color: $main;
  font-size: 1rem;
  background: rgba($main, 0.3);
  border: 1px solid rgba($main, 0.5);
  border-right: none;

  &:focus {
    outline-color: $main;
  }

  &::placeholder {
    color: $main;
  }
}

.search-form__button {
  padding: 5px 10px;
  color: $main;
  font-size: 1rem;
  background: rgba($main, 0.3);
  border: 1px solid rgba($main, 0.5);
  &:focus {
    outline-color: $main;
  }
}
</style>
