<template>
  <div class="plus-widget-settings">
    <PlusWidgetCities @setCities="(cities) => $emit('setCities', cities)" />
  </div>
</template>

<script>
import PlusWidgetCities from "@/components/PlusWidget/components/PlusWidgetSettings/components/PlusWidgetCities/PlusWidgetCities";
export default {
  name: "PlusWidgetSettings",
  components: {
    PlusWidgetCities,
  },
};
</script>

<style scoped></style>
