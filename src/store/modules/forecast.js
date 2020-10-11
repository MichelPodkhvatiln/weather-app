import axios from "@/utils/axios";
import moment from "moment";
import { openWeatherFormatter } from "@/utils/open-weather-helper";

export default {
  state: {
    forecast: {
      current: {},
      daily: [],
      hourly: [],
      meta: {}
    },
    position: {
      lat: 0,
      lon: 0
    }
  },
  getters: {
    currentForecast(state) {
      return state.forecast.current;
    },
    dailyForecast(state) {
      return state.forecast.daily;
    },
    hourlyForecats(state) {
      return state.forecast.hourly;
    },
    currentExtendedTemp(state) {
      const currentDate = state.forecast.current.id;
      const currentDay = state.forecast.daily.find(
        day => day.id === currentDate
      );

      return {
        current: state.forecast.current.temp,
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
    setPosition(state, payload) {
      state.position.lat = payload.lat;
      state.position.lon = payload.lon;
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

    async getForecast({ state, commit }) {
      try {
        const res = await axios.get("/onecall", {
          params: {
            lat: state.position.lat,
            lon: state.position.lon,
            appid: `${process.env.VUE_APP_OPENWEATHER_API_KEY}`,
            units: "metric"
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
      } catch (error) {
        throw new Error(error);
      }
    },

    async getForecastByCurrentPosition({ commit, dispatch }, payload) {
      commit("setPosition", payload);
      await dispatch("getForecast");
    }
  }
};
