<template>
  <div class="location-config-item">
    <span class="location-config-item__drag-btn">
      <DragIcon />
    </span>
    <span class="location-config-item__name"
      >{{ city.name }}, {{ city.country }}</span
    >
    <span class="location-config-item__remove-btn" @click="removeCity">
      <RemoveIcon />
    </span>
  </div>
</template>

<script lang="ts">
export default {
  name: "LocationConfigItem",
};
</script>
<script lang="ts" setup>
import DragIcon from "./icons/drag-svgrepo-com.svg";
import RemoveIcon from "./icons/delete-svgrepo-com.svg";
import { UserCity } from "@/components/PlusWidget/interfaces";
import { computed, inject } from "vue";

const props = defineProps<{
  city: UserCity;
}>();

const getCities = inject<() => UserCity[]>("getCities");
const cities = computed(() => getCities?.());

const emit = defineEmits(["setCities"]);

function removeCity() {
  const citiesArray = cities.value ? cities.value : [];
  emit(
    "setCities",
    citiesArray.filter((x) => x.name !== props.city.name)
  );
}
</script>

<style scoped></style>
