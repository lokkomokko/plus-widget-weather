<template>
  <div class="plus-widget-location-list">
    <PlusWidgetLocation
      v-for="(city, index) in cities"
      :key="index"
      :city="city"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: "PlusWidgetLocationList",
};
</script>

<script lang="ts" setup>
import { computed, inject } from "vue";
import { UserCity } from "@/components/PlusWidget/interfaces";
import PlusWidgetLocation from "@/components/PlusWidget/components/PlusWidgetLocationList/components/PlusWidgetLocation/PlusWidgetLocation";

const getCities = inject<() => UserCity[]>("getCities");
const cities = computed(() => getCities?.());
</script>

<style scoped></style>
