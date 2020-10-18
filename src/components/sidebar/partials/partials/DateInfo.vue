<template>
  <div class="date-info">
    <div class="date-info__icon">
      <i class="far fa-calendar-alt" />
    </div>

    <div class="date-info__value">
      <p>
        {{ currentDateTime }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DateInfo",

  computed: {
    ...mapGetters("forecast", ["currentDateTime"])
  }
};
</script>

<style scoped lang="scss">
.date-info {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.85;
}

.date-info__icon {
  font-size: 1rem;
}

.date-info__value {
  font-size: 1.25rem;
  margin: 0 5px;
}
</style>
