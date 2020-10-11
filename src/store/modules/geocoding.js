import axios from "@/utils/axios";

export default {
  state: {
    geocoding: null
  },
  getters: {
    getGeocoding(state) {
      return state.geocoding;
    }
  },
  mutations: {
    setGeocoding(state, payload) {
      state.geocoding = payload;
    }
  },
  actions: {
    async getInfo({ commit, dispatch }, payload) {
      const res = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
          params: {
            address: payload,
            key: `${process.env.VUE_APP_GOOGLE_GEOLOCATION_API_KEY}`
          }
        }
      );
      commit("setGeocoding", res);

      console.log(res);
      await dispatch("getForecast", {
        lat: res.data.results[0].geometry.location.lat,
        lon: res.data.results[0].geometry.location.lng
      });
    }
  }
};
