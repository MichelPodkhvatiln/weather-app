<template>
  <form class="search-form" @submit.prevent="">
    <template v-if="!loading">
      <input
        class="search-form__input"
        type="search"
        v-model="address"
        placeholder="Enter location..."
        @keyup.enter.prevent="search"
      />
      <button class="search-form__button" type="button" @click="search">
        <i class="fas fa-search" />
      </button>
    </template>

    <template v-else>
      <span class="search-form__info">Searching...</span>
      <spring-spinner :animation-duration="3000" :size="25" color="#ffffff" />
    </template>
  </form>
</template>

<script>
import { mapActions } from "vuex";

import { SpringSpinner } from "epic-spinners";

export default {
  name: "SearchBar",

  components: {
    SpringSpinner
  },

  data() {
    return {
      address: "",
      loading: false
    };
  },

  methods: {
    ...mapActions("geocoding", ["getInfo"]),

    async search() {
      try {
        this.loading = true;
        await this.getInfo(this.address);
      } catch (error) {
        console.error(error);
      }

      this.address = "";
      this.loading = false;
    }
  }
};
</script>

<style scoped lang="scss">
$main: #ffffff;
$accent: #000000;

@mixin main-styling($main) {
  padding: 5px 10px;
  color: rgba($main, 0.85);
  font-size: 1rem;
  background: rgba($main, 0.3);
  border: 1px solid rgba($main, 0.5);

  &::placeholder {
    color: rgba($main, 0.85);
  }
}

@mixin on-actions-style($accent) {
  transition: all 0.3s ease-in-out;

  &:hover {
    color: rgba($main, 1);
    background: rgba($accent, 0.1);

    &::placeholder {
      color: rgba($main, 1);
    }
  }

  &:focus {
    color: rgba($main, 1);
    outline: none;
    background: rgba($accent, 0.1);

    &::placeholder {
      color: rgba($main, 1);
    }
  }
}

.search-form {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.search-form__input {
  width: 80%;
  @include main-styling($main);
  border-right: none;
  @include on-actions-style($accent);
}

.search-form__button {
  width: 20%;
  cursor: pointer;
  @include main-styling($main);
  @include on-actions-style($accent);
}

.search-form__info {
  margin: 0 10px;
  color: $main;
  font-size: 1.25rem;
}
</style>
