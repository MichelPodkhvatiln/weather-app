<template>
  <nav class="navbar">
    <button
      class="navbar__tab"
      :class="hourlyActiveClasses"
      @click.prevent="onSelectTab('hourly')"
    >
      Hourly
    </button>
    <button
      class="navbar__tab"
      :class="dailyActiveClasses"
      @click.prevent="onSelectTab('daily')"
    >
      Weekend
    </button>
  </nav>
</template>

<script>
export default {
  name: "Navbar",

  props: {
    activeChart: String
  },

  computed: {
    hourlyActiveClasses() {
      return {
        "navbar__tab--active": this.activeChart === "hourly"
      };
    },
    dailyActiveClasses() {
      return {
        "navbar__tab--active": this.activeChart === "daily"
      };
    }
  },

  methods: {
    onSelectTab(value) {
      this.$emit("selectTab", value);
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
  font-size: 0.8rem;
  background-color: rgba($main, 0.2);
  border: 1px solid rgba($main, 1);
  cursor: pointer;

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

.navbar {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  height: 50px;
  background-color: #72afd7;
}

.navbar__tab {
  padding: 7px;
  min-width: 100px;
  @include main-styling($main);
  @include on-actions-style($accent);
}

.navbar__tab + .navbar__tab {
  margin: 10px;
}

.navbar__tab--active {
  background-color: rgba($accent, 0.1);
}
</style>
