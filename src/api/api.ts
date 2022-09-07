import {
  WeatherResponseErrorInterface,
  WeatherResponseInterface,
} from "@/components/PlusWidget/interfaces";

const WEATHER_API_KEY = "6c0e139e49a56cf7da66bb3cb397ae5c";

export const Api = {
  async getCityWeather(
    cityName: string
  ): Promise<WeatherResponseErrorInterface | WeatherResponseInterface> {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WEATHER_API_KEY}&units=metric`
    );
    return await response.json();
  },
  async getUserCity() {
    const response = await fetch(`https://geolocation-db.com/jsonp/`);
    return await response.text();
  },
};
