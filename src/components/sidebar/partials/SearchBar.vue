<template>
  <form class="search-form" @submit.prevent="">
    <template v-if="!isLoading">
      <input
        class="search-form__input"
        type="search"
        v-model="address"
        placeholder="Enter location..."
        @keyup.enter.prevent="search"
        :disabled="isSearch"
      />
      <button
        class="search-form__button"
        type="button"
        @click="search"
        :disabled="isSearch"
      >
        <i class="fas fa-search" />
      </button>
    </template>
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import { objectIsEmpty } from "@/utils/check-helper";

export default {
  name: "SearchBar",

  data() {
    return {
      isSearch: false,
      address: ""
    };
  },

  computed: {
    ...mapGetters("forecast", ["currentForecast"]),

    isLoading() {
      return objectIsEmpty(this.currentForecast);
    }
  },

  methods: {
    ...mapActions("geocoding", ["getInfo"]),

    async search() {
      if (!this.address.trim().length) {
        return;
      }

      try {
        this.isSearch = true;

        await this.getInfo(this.address);
      } catch (error) {
        console.error(error);
      }

      this.isSearch = false;
      this.address = "";
    }
  }
};
</script>

<style scoped lang="scss">
$main: #ffffff;
$accent: #000000;

@mixin main-styling($main) {
  padding: 7px 10px;
  color: rgba($main, 0.85);
  font-size: 1rem;
  background-color: rgba($main, 0.3);
  border: 1px solid rgba($main, 0.5);

  &::placeholder {
    color: rgba($main, 0.85);
  }

  &:disabled {
    opacity: 0.5;
  }
}

@mixin on-actions-style($accent) {
  transition: all 0.3s ease-in-out;

  &:not([disabled]) {
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

  &:disabled {
    cursor: not-allowed;
  }
}

.search-form__button {
  width: 20%;
  cursor: pointer;
  @include main-styling($main);
  @include on-actions-style($accent);

  &:disabled {
    cursor: not-allowed;
  }
}

.search-form__info {
  margin: 0 10px;
  color: $main;
  font-size: 1.25rem;
}
</style>
