import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    globalOverlay: false
  },
  getters: {
    GET_GLOBAL_OVERLAY_STATUS: state => state.globalOverlay
  },
  mutations: {
    SET_GLOBAL_OVERLAY_STATUS: (state, status) => {
      state.globalOverlay = status
    }
  }
})