import axios from "@/utils/axios";
import moment from "moment";
import { openWeatherFormatter } from "@/utils/open-weather-helper";

export default {
  namespaced: true,
  state: {
    units: "metric",
    forecast: {
      current: {},
      daily: [],
      hourly: [],
      meta: {}
    },
    currentPosition: {
      lat: 0,
      lon: 0
    }
  },
  getters: {
    units(state) {
      return state.units;
    },
    currentForecast(state) {
      return state.forecast.current;
    },
    dailyForecast(state) {
      return state.forecast.daily;
    },
    hourlyForecats(state) {
      return state.forecast.hourly;
    },
    currentTemp(state) {
      return state.forecast.current.temp;
    },
    currentExtendedTemp(state) {
      const currentDate = state.forecast.current.id;
      const currentDay = state.forecast.daily.find(
        day => day.id === currentDate
      );

      return {
        min: currentDay.temp.min,
        max: currentDay.temp.max
      };
    },
    currentWeatherDescr(state) {
      return state.forecast.current.weather;
    },
    currentDateTime(state) {
      return moment(state.forecast.current.dtRaw).format("DD MMMM YYYY HH:mm");
    }
  },
  mutations: {
    setUnits(state, payload) {
      state.units = payload;
    },
    resetForecast(state) {
      state.forecast = {
        current: {},
        daily: [],
        hourly: [],
        meta: {}
      };
    },
    setCurrentPosition(state, payload) {
      state.currentPosition.lat = payload.lat;
      state.currentPosition.lon = payload.lon;
    },
    setForecastCurrent(state, payload) {
      state.forecast.current = payload;
    },
    setForecastDaily(state, payload) {
      state.forecast.daily = payload;
    },
    setForecastHourly(state, payload) {
      state.forecast.hourly = payload;
    },
    setForecastMeta(state, payload) {
      state.forecast.meta = payload;
    }
  },
  actions: {
    async changeUnits({ state, commit, dispatch }) {
      if (state.units === "metric") {
        commit("setUnits", "imperial");
        await dispatch("getForecast");
        return;
      }

      if (state.units === "imperial") {
        commit("setUnits", "metric");
        await dispatch("getForecast");
        return;
      }
    },
    async getPosition({ dispatch }) {
      if (!("geolocation" in navigator)) {
        //hardcoded Moscow lat and lon
        const position = {
          lat: 60.7,
          lon: 30.9
        };

        await dispatch("getForecastByCurrentPosition", position);
        return;
      }

      navigator.geolocation.getCurrentPosition(async pos => {
        const position = {
          lat: pos.coords.latitude.toFixed(2),
          lon: pos.coords.longitude.toFixed(2)
        };

        await dispatch("getForecastByCurrentPosition", position);
      });
    },

    async getForecast({ state, commit, dispatch }, payload) {
      try {
        commit("resetForecast");

        const res = await axios.get("/onecall", {
          params: {
            lat: payload ? payload.lat : state.currentPosition.lat,
            lon: payload ? payload.lon : state.currentPosition.lon,
            appid: `${process.env.VUE_APP_OPENWEATHER_API_KEY}`,
            units: state.units
          }
        });

        const current = openWeatherFormatter("current", res.data.current);
        const daily = openWeatherFormatter("daily", res.data.daily);
        const hourly = openWeatherFormatter("hourly", res.data.hourly);
        const meta = {
          lat: res.data.lat,
          lon: res.data.lon,
          timezone: res.data.timezone,
          timezoneOffset: res.data.timezone_offset
        };

        commit("setForecastCurrent", current);
        commit("setForecastDaily", daily);
        commit("setForecastHourly", hourly);
        commit("setForecastMeta", meta);
        if (!payload) {
          const latlng = `${state.currentPosition.lat},${state.currentPosition.lon}`;
          await dispatch("geocoding/getReverseInfo", latlng, { root: true });
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async getForecastByCurrentPosition({ commit, dispatch }, payload) {
      commit("setCurrentPosition", payload);
      await dispatch("getForecast");
    }
  }
};
