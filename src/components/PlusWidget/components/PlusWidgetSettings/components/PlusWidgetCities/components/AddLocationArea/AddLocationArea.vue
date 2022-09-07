<template>
  <form class="add-location-area" @submit.prevent="findAndAddCity">
    <div class="add-location-area__label">
      Add Location:
      <span class="add-location-area__error-text" v-if="errorText">{{
        errorText
      }}</span>
    </div>
    <div class="add-location-area__input">
      <input
        type="text"
        placeholder="Some city"
        v-model="cityName"
        @input="errorText = ''"
      />
      <button type="submit" class="add-location-area__button">
        <AddIcon />
      </button>
      <AddLocationPreloader
        class="add-location-area__preloader"
        v-if="loading"
      />
    </div>
  </form>
</template>

<script lang="ts">
export default {
  name: "AddLocationArea",
  methods: {},
};
</script>

<script lang="ts" setup>
import AddIcon from "./icons/add-svgrepo-com.svg";
import AddLocationPreloader from "@/components/PlusWidget/components/PlusWidgetSettings/components/PlusWidgetCities/components/AddLocationArea/components/AddLocationPreloader/AddLocationPreloader";
import { Api } from "@/api/api";
import { computed, inject, ref } from "vue";
import {
  UserCity,
  WeatherResponseIsSuccess,
} from "@/components/PlusWidget/interfaces";

const cityName = ref("");
const loading = ref(false);
const errorText = ref("");
const getCities = inject<() => UserCity[]>("getCities");
const cities = computed(() => getCities?.());

const emit = defineEmits(["setCities"]);

function addCity(city: UserCity) {
  const citiesArray = cities.value ? cities.value : [];
  if (!citiesArray.find((x) => x.name === city.name)) {
    emit("setCities", [...citiesArray, city]);
  }
}
function findAndAddCity() {
  if (cityName.value) {
    loading.value = true;
    Api.getCityWeather(cityName.value)
      .then((res) => {
        if (WeatherResponseIsSuccess(res)) {
          const city = {
            name: res.name,
            country: res.sys.country,
            order: cities.value ? cities.value.length + 1 : 1,
          };
          addCity(city);
          cityName.value = "";
        } else if (Number(res.cod) !== 200) {
          errorText.value = res.message;
        }
      })
      .finally(() => {
        loading.value = false;
      });
  }
}
</script>

<style scoped></style>
