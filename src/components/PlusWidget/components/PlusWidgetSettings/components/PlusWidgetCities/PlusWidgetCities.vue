<template>
  <div class="plus-widget-cities__wrapper">
    <draggable
      class="plus-widget-cities__list"
      :list="cities"
      item-key="order"
      @end="setCitiesOrder"
    >
      <template #item="{ element }">
        <LocationConfigItem
          :city="element"
          @setCities="(cities) => $emit('setCities', cities)"
        />
      </template>
    </draggable>
    <AddLocationArea
      class="plus-widget-cities__add-location-area"
      @setCities="(cities) => $emit('setCities', cities)"
    />
  </div>
</template>

<script lang="ts">
import draggable from "vuedraggable";

export default {
  name: "PlusWidgetCities",
  components: {
    draggable,
  },
};
</script>

<script lang="ts" setup>
import LocationConfigItem from "@/components/PlusWidget/components/PlusWidgetSettings/components/PlusWidgetCities/components/LocationConfigItem/LocationConfigItem";
import AddLocationArea from "@/components/PlusWidget/components/PlusWidgetSettings/components/PlusWidgetCities/components/AddLocationArea/AddLocationArea";
import { UserCity } from "@/components/PlusWidget/interfaces";
import { computed, inject, ref } from "vue";
const getCities = inject<() => UserCity[]>("getCities");
const cities = computed(() => getCities?.());

const emit = defineEmits(["setCities"]);

function setCitiesOrder() {
  let index = 0;
  const sordedCities = cities.value?.map((i) => {
    i.order = index;
    index++;
    return i;
  });
  emit("setCities", sordedCities);
}
</script>

<style scoped></style>
