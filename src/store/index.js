import Vue from "vue";
import Vuex from "vuex";
import forecast from "@/store/modules/forecast";
import geocoding from "@/store/modules/geocoding";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    forecast,
    geocoding
  }
});
