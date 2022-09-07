<template>
  <div class="plus-widget-location">
    <div class="plus-widget-location__name">{{ city.name }}</div>
    <div class="plus-widget-location__content">
      <template v-if="weatherInfo">
        <div class="plus-widget-location__header">
          <div class="plus-widget-location__img">
            <img
              :src="`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`"
              alt="weather pic"
            />
          </div>
          <div class="plus-widget-location__temperature">
            {{ weatherInfo.main.temp.toFixed(0) }} ℃
          </div>
        </div>
        <div class="plus-widget-location__desc">
          {{ weatherInfo.weather[0].description }}
        </div>
        <div class="plus-widget-location-weather-info">
          <div class="plus-widget-location-weather-info__item">
            <p>Wind: {{ weatherInfo.wind.speed }}m/s</p>
          </div>
          <div class="plus-widget-location-weather-info__item">
            <p>Pressure: {{ weatherInfo.main.pressure }}hPa</p>
          </div>
          <div class="plus-widget-location-weather-info__item">
            <p>Humidity: {{ weatherInfo.main.humidity }}%</p>
          </div>
          <div class="plus-widget-location-weather-info__item">
            <p>
              Dev point:
              {{
                calcDewPoint(
                  weatherInfo.main.temp.toFixed(0),
                  weatherInfo.main.humidity
                )
              }}℃
            </p>
          </div>
          <div class="plus-widget-location-weather-info__item">
            <p>Visibility: {{ weatherInfo.visibility / 1000 }}km</p>
          </div>
        </div>
      </template>
      <div class="plus-widget-location__preloader" v-else>...</div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "PlusWidgetLocation",
};
</script>

<script lang="ts" setup>
import {
  UserCity,
  WeatherResponseInterface,
  WeatherResponseIsSuccess,
} from "@/components/PlusWidget/interfaces";
import { Api } from "@/api/api";
import { computed, ref } from "vue";
import { calcDewPoint } from "@/helpers/helpers";

const props = defineProps<{
  city: UserCity;
}>();

const weatherInfo = ref<WeatherResponseInterface | null>(null);

function getWeatherInfo() {
  Api.getCityWeather(props.city.name).then((res) => {
    if (WeatherResponseIsSuccess(res)) {
      weatherInfo.value = res;
    }
  });
}
getWeatherInfo();
</script>

<style scoped></style>
