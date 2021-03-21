import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    history: [],
    credentials: [],
    count: 0,
    postContentText: "",
  },
  getters: {
    getPostContentText: (state) => {
      return state.postContentText;
    },
<<<<<<< HEAD
=======
    getPostPhotoLink: (state) => {
      return state.postPhotoLink;
    },
>>>>>>> dev

    getHistory(state) {
      return state.history;
    },
    getCredentials(state) {
      return state.credentials;
    },
  },
  mutations: {
<<<<<<< HEAD
=======
    setPostPhotoLink: (state, payload) => {
      state.postPhotoLink = payload.link;
    },
>>>>>>> dev
    setPostContentText(state, payload) {
      state.postContentText = payload.contentText;
    },
    clearPostContentText(state) {
      state.postContentText = "";
    },

    increment(state) {
      state.count++;
    },
    addToHistory(state, payload) {
      if (state.history.length < 5) {
        state.history.push(payload);
      } else {
        state.history.shift();
        state.history.push(payload);
      }
    },
    SET_PRODUCTS: (state, credentials) => {
      //capitalization is good-practice for vuex-mutations
      state.credentials = credentials;
    },
  },
  actions: {},
  modules: {},
});
