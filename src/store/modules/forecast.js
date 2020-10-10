import axios from "@/utils/axios";
export default {
  state: {
    forecast: null
  },
  getters: {
    forecast(state) {
      return state.forecast;
    }
  },
  mutations: {
    setForecast(state, payload) {
      state.forecast = payload;
    }
  },
  actions: {
    async getForecast({ commit }) {
      const res = await axios.get("/onecall", {
        //hardcoded Moscow lat and lon
        params: {
          lat: 60.9,
          lon: 30.9,
          exclude: "current",
          appid: `${process.env.VUE_APP_OPENWEATHER_API_KEY}`,
          units: "metric"
        }
      });

      commit("setForecast", res.data);
    }
  }
};
