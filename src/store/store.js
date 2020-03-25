import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    globalOverlay: false,
    theme: 'default'
  },
  getters: {
    GET_GLOBAL_OVERLAY_STATUS: state => state.globalOverlay,
    GET_THEME: state => state.theme
  },
  mutations: {
    SET_GLOBAL_OVERLAY_STATUS: (state, status) => state.globalOverlay = status,
    SET_THEME: (state, theme) => state.theme = theme
  }
})