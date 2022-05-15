// src/main.js
import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueRouter from "vue-router";

// VueLazyload
import VueLazyload from 'vue-lazyload'
 
Vue.use(VueLazyload)



import routes from "./router/index";
import Vodal from "vodal";

import VueMeta from 'vue-meta'

Vue.use(VueMeta, {
  keyName: 'metaInfo',
  attribute: 'data-vue-meta',
  ssrAttribute: 'data-vue-meta-server-rendered',
  tagIDKeyName: 'vmid',
  refreshOnceOnNavigation: false
})

//import jQuery from "jquery";
global.jQuery = require("jquery");
var $ = global.jQuery;
window.$ = $;

import Vue2Filters from "vue2-filters";
Vue.use(Vue2Filters);

Vue.component(Vodal.name, Vodal);
Vue.config.productionTip = false;

/*
Vue.config.devtools = true;

// Before you create app
Vue.config.devtools = process.env.NODE_ENV === 'development'
// After you create app
window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor
// then had to add in ./store.js as well.
Vue.config.devtools = process.env.NODE_ENV === 'development'
*/
Vue.config.devtools = true;


//Vue.prototype.$apiurl = 'approved'
Vue.prototype.$apiurl = "approved";

import VueImageBrightness from "vue-image-brightness";
Vue.use(VueImageBrightness);

//////

// https://www.digitalocean.com/community/tutorials/vuejs-vue-socketio

/*
import socketio from 'socket.io';
import VueSocketIO from 'vue-socket.io';

export const SocketInstance = socketio('ws://localhost:3000');
//export const SocketInstance = socketio('http://localhost:3000');

Vue.use(VueSocketIO, SocketInstance)
*/

//https://www.npmjs.com/package/vue-socket.io
//import SocketIO from 'socket.io';
import VueSocketIO from "vue-socket.io";
//const options = {}; //Options object to pass into SocketIO

Vue.use(
  new VueSocketIO({
    debug: true,
    //connection: 'ws://localhost:3000',
    //connection: 'ws://agile-everglades-15507.herokuapp.com',
    //connection: 'https://agile-everglades-15507.herokuapp.com',
    connection: process.env.VUE_APP_SOCKETIO,
    //connection: SocketIO(process.env.VUE_APP_SOCKETIO, options), //options object is Optional

    //connection: 'ws://localhost:3000',
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_",
    },
    //options: {}, //Optional options
  })
);

/////

//window.Evento = new Vue();

import ImageKit from "imagekitio-vue"

Vue.use(ImageKit, {
  urlEndpoint: process.env.VUE_APP_IMAGEKIT_ENDPOINT, // Required. Default URL-endpoint is https://ik.imagekit.io/your_imagekit_id
  publicKey: process.env.VUE_APP_IMAGEKIT_PUBLICKEY, // optional
  //authenticationEndpoint: "https://www.your-server.com/auth" // optional
})


///#
///#
/*
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
*/
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './registerServiceWorker'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
//@import "vodal/common.css";
//@import "vodal/rotate.css";

import VueHead from 'vue-head'
 
Vue.use(VueHead, {
  separator: '-',
  complement: 'Anoringa'
})

Vue.use(VueRouter)

Vue.config.devtools = true


new Vue({
  store,
  router: new VueRouter(routes),
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
