import axios from "@/utils/axios";
import { geocodingFormatter } from "@/utils/geocoding-helper";
import { objectIsEmpty } from "@/utils/check-helper";

export default {
  state: {
    geocoding: {}
  },
  getters: {
    address(state) {
      if (objectIsEmpty(state.geocoding)) {
        return "";
      }

      return state.geocoding.address;
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

      commit("setGeocoding", geocodingFormatter(res.data));
      await dispatch("getForecast", {
        lat: geocodingFormatter(res.data).lat,
        lon: geocodingFormatter(res.data).lon
      });
    },
    async getReverseInfo({ commit }, payload) {
      const res = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
          params: {
            latlng: payload,
            key: `${process.env.VUE_APP_GOOGLE_GEOLOCATION_API_KEY}`
          }
        }
      );

      commit("setGeocoding", geocodingFormatter(res.data));
    }
  }
};
