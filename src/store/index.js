import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    history: [],
    credentials: [],
    count: 0,
    postContentText: "",
    postImage:{
        value: { 
          type: null, 
          source: null },
        content: null,
    },
    PostImageStatus:{
      photoStatus: null,
      from: null,
    },
    postUsertriedtopublicate: false,
  },
  getters: {
    getPostContentText: (state) => {
      return state.postContentText;
    },
    getPostPhotoLink: (state) => {
      return state.postPhotoLink;
    },

    getHistory(state) {
      return state.history;
    },
    getCredentials(state) {
      return state.credentials;
    },
  },
  mutations: {
    setPostUsertriedtopublicate: (state, payload) => {
      state.postUsertriedtopublicate = payload.data;
    },

    setPostImage: (state, payload) => {
      state.postImage.content = payload.content;
      state.postImage.value.type = payload.value.type;
      state.postImage.value.source = payload.value.source;
    },

    setPostImageStatus: (state, payload) => {
      state.PostImageStatus.photoStatus = payload.photoStatus;
      state.PostImageStatus.from = payload.from;
    },



    setPostPhotoLink: (state, payload) => {
      state.postPhotoLink = payload.link;
    },
    clearPostPhotoLink(state) {
      state.postPhotoLink = "";
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
