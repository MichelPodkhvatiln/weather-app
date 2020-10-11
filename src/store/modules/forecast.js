import axios from "@/utils/axios";
import { responseFormatter } from "@/utils/response-formatter";

export default {
  state: {
    forecast: {},
    position: {
      lat: 0,
      lon: 0
    }
  },
  getters: {
    forecast(state) {
      return state.forecast;
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

        const current = responseFormatter("current", res.data.current);
        const daily = responseFormatter("daily", res.data.daily);
        const hourly = responseFormatter("hourly", res.data.hourly);
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
