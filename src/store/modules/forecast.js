import axios from "@/utils/axios";
export default {
  state: {
    forecast: null,
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
    setForecast(state, payload) {
      state.forecast = payload;
    },
    setPosition(state, payload) {
      state.position.lat = payload.lat;
      state.position.lon = payload.lon;
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
            exclude: "current",
            appid: `${process.env.VUE_APP_OPENWEATHER_API_KEY}`,
            units: "metric"
          }
        });

        commit("setForecast", res.data);
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
