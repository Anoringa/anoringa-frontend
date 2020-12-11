import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    history: [],
    credentials: [],
  },
  getters: {
    getHistory(state) {
      return state.history
    },
    getCredentials(state) {
      return state.credentials
    }
  },
  mutations: {
    addToHistory(state, payload) {
      if(state.history.length < 5) {
        state.history.push(payload)
      }
      else {
        state.history.shift()
        state.history.push(payload)
      }
    },
    SET_PRODUCTS: (state, credentials) => { //capitalization is good-practice for vuex-mutations
        state.credentials = credentials;
    }
  },
  actions: {
  },
  modules: {
  }
})