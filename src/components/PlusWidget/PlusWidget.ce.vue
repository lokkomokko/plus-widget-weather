<template>
  <div class="plus-widget">
    <PlusWidgetHeader
      v-model:settingsOpen="settingsOpen"
      :title="settingsOpen ? 'Settings' : 'List'"
    />
    <div class="plus-widget__content">
      <PlusWidgetSettings v-if="settingsOpen" @setCities="setCities" />
      <PlusWidgetLocationList v-else />
    </div>
    <PlusWidgetFooter />
  </div>
</template>

<script lang="ts">
export default {
  name: "PlusWidget",
};
</script>

<script lang="ts" setup>
import PlusWidgetHeader from "@/components/PlusWidget/components/PlusWidgetHeader/PlusWidgetHeader";
import PlusWidgetFooter from "@/components/PlusWidget/components/PlusWidgetFooter/PlusWidgetFooter";
import PlusWidgetSettings from "@/components/PlusWidget/components/PlusWidgetSettings/PlusWidgetSettings";
import PlusWidgetLocationList from "@/components/PlusWidget/components/PlusWidgetLocationList/PlusWidgetLocationList";
import { provide, ref } from "vue";
import {
  UserCity,
  WeatherResponseIsSuccess,
} from "@/components/PlusWidget/interfaces";
import { Api } from "@/api/api";

const storageCities = localStorage.getItem("userCities")
  ? JSON.parse(localStorage.getItem("userCities") || "{}")
  : [];
const userCities = ref<UserCity[]>(storageCities);
const settingsOpen = ref(false);

provide<() => UserCity[]>("getCities", () => userCities.value);

function setCities(cities: UserCity[]): void {
  userCities.value = cities;
  localStorage.setItem("userCities", JSON.stringify(cities));
}

function setInitialUserCity() {
  Api.getUserCity().then((res) => {
    const response = JSON.parse(res.replace("callback(", "").slice(0, -1));
    Api.getCityWeather(response.city).then((weatherJson) => {
      if (WeatherResponseIsSuccess(weatherJson)) {
        setCities([
          {
            name: weatherJson.name,
            country: weatherJson.sys.country,
            order: 0,
          },
        ]);
      }
    });
  });
}

if (!userCities.value.length) {
  setInitialUserCity();
}
function setFonts() {
  var link = document.createElement("link");
  var head = document.getElementsByTagName("head")[0];
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap";
  head.appendChild(link);
}
setFonts();
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap");

// plus-widget
//------------------------------------------------------------------------------
.plus-widget {
  width: 360px;
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.33);
  border-radius: 5px;
  box-shadow: 1px 1px 7px 2px #00000038;
  box-sizing: border-box;
  padding: 0 15px;
  height: 500px;
  font-family: "Play";
  font-size: 16px;
  overflow: hidden;
  user-select: none;
}
.plus-widget * {
  flex-shrink: 0;
  padding: 0;
  margin: 0;
}
.plus-widget__content {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
}
.plus-widget__footer {
  height: 40px;
  border-top: 1px solid rgba(0, 0, 0, 0.33);
  display: flex;
  align-items: center;
  justify-content: center;
}
.plus-widget-header {
  height: 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.33);
  display: flex;
  align-items: center;
}
.plus-widget-header__menu-toggle-button {
  margin-left: auto;
  display: flex;
  cursor: pointer;
}
.plus-widget-header__menu-toggle-button svg {
  width: 20px;
  height: 20px;
}
//------------------------------------------------------------------------------

// plus-widget-location-list
//------------------------------------------------------------------------------
.plus-widget-location-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px 0;
}
//------------------------------------------------------------------------------

// plus-widget-location
//------------------------------------------------------------------------------
.plus-widget-location {
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.11);
  border-radius: 5px;
  box-sizing: border-box;
  padding: 15px;
  font-size: 14px;
}
.plus-widget-location__content {
  display: flex;
  flex-direction: column;
  min-height: 197px;
}
.plus-widget-location__name {
  font-weight: bold;
  font-size: 20px;
}
.plus-widget-location__header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
}
.plus-widget-location__img img {
  width: 70px;
  height: auto;
}
.plus-widget-location__temperature {
  font-size: 30px;
}
.plus-widget-location__desc {
  margin-bottom: 20px;
}
.plus-widget-location-weather-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}
.plus-widget-location-weather-info__item {
  display: flex;
  align-items: center;
  gap: 10px;
}
.plus-widget-location-weather-info__item-icon {
  width: 20px;
  display: flex;
  align-items: center;
}
//------------------------------------------------------------------------------

// plus-widget-settings
//------------------------------------------------------------------------------
.plus-widget-settings {
  display: flex;
  flex-direction: column;
  padding: 15px;
}
//------------------------------------------------------------------------------

// plus-widget-cities
//------------------------------------------------------------------------------
.plus-widget-cities__wrapper {
  display: flex;
  flex-direction: column;
}
.plus-widget-cities__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.plus-widget-cities__add-location-area {
  margin-top: 40px;
}
//------------------------------------------------------------------------------

// add-location-area
//------------------------------------------------------------------------------
.add-location-area__label {
  margin-bottom: 10px;
}
.add-location-area__input {
  display: flex;
  gap: 5px;
  position: relative;
}
.add-location-area__input input {
  flex: 1;
  padding: 10px;
}
.add-location-area__button {
  display: flex;
  cursor: pointer;
  border: none;
  box-shadow: none;
  border-radius: 0;
  background: none;
}
.add-location-area__button svg {
  width: 40px;
}
.add-location-area__preloader {
  position: absolute;
  right: 9px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
}
.add-location-area__error-text {
  color: red;
}
//------------------------------------------------------------------------------

// add-location-preloader
//------------------------------------------------------------------------------
.add-location-preloader {
  background: #fff;
}
.add-location-preloader svg {
  width: 20px;
  height: 20px;
}
//------------------------------------------------------------------------------

// location-config-item
//------------------------------------------------------------------------------
.location-config-item {
  height: 40px;
  background: rgba(0, 0, 0, 0.03);
  padding: 5px 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 15px;
}
.location-config-item__remove-btn {
  margin-left: auto;
  display: flex;
  cursor: pointer;
}
.location-config-item__remove-btn svg {
  width: 20px;
}
.location-config-item__drag-btn {
  display: flex;
  cursor: move;
}
.location-config-item__drag-btn svg {
  width: 20px;
}
//------------------------------------------------------------------------------
</style>
