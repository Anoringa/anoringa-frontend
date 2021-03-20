import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    history: [],
    credentials: [],
<<<<<<< Updated upstream
  },
  getters: {
=======
    count: 0,
    postContentText: "",
    postPhotoLink: "",
  },
  getters: {
    getPostContentText: (state) => {
      return state.postContentText;
    },
    getPostPhotoLink: (state) => {
      return state.postPhotoLink;
    },

>>>>>>> Stashed changes
    getHistory(state) {
      return state.history
    },
    getCredentials(state) {
      return state.credentials
    }
  },
  mutations: {
<<<<<<< Updated upstream
=======
    setPostPhotoLink: (state, payload) => {
      state.postPhotoLink = payload.link;
    },
    setPostContentText(state, payload) {
      state.postContentText = payload.contentText;
    },
    clearPostContentText(state) {
      state.postContentText = "";
    },

    increment(state) {
      state.count++;
    },
>>>>>>> Stashed changes
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