// src/main.js

// other imports...
/*
import runtime from "serviceworker-webpack-plugin/lib/runtime";

if ("serviceWorker" in navigator) {
  runtime.register();
}
*/

// createApp...
/*
if ("serviceWorker" in navigator) {
  // Register a service worker hosted at the root of the
  // site using the default scope.
  navigator.serviceWorker.register("/sw.js").then(
    function(registration) {
      console.log("Service worker registration succeeded:", registration);
    },
     function(error) {
      console.log("Service worker registration failed:", error);
    }
  );
} else {
  console.log("Service workers are not supported.");
}
*/

import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueRouter from "vue-router";

//import '@/assets/css/tailwind.css';


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

Vue.config.devtools = true;

/*

import VueMeta from 'vue-meta'

Vue.use(VueMeta, {
  keyName: 'metaInfo',
  attribute: 'data-vue-meta',
  ssrAttribute: 'data-vue-meta-server-rendered',
  tagIDKeyName: 'vmid',
  refreshOnceOnNavigation: true
})

*/

/*
import Meta from "vue-meta";
Vue.use(Meta);
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: false
})
*/
/*
import PortalVue from 'portal-vue'
Vue.use(PortalVue)
*/


/*
import VuePageTitle from 'vue-page-title'
 
Vue.use(VuePageTitle, {
  // prefix: 'My App - ',
  suffix: '- Anoringa'
})
*/

//import jQuery from "jquery";
global.jQuery = require("jquery");
var $ = global.jQuery;
window.$ = $;

import Vue2Filters from "vue2-filters";
Vue.use(Vue2Filters);

Vue.component(Vodal.name, Vodal);
Vue.config.productionTip = false;
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
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./registerServiceWorker";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
//@import "vodal/common.css";
//@import "vodal/rotate.css";


import VueHead from 'vue-head'
 
Vue.use(VueHead, {
  separator: '-',
  complement: 'Anoringa'
})

Vue.use(VueRouter)



new Vue({
  store,
  router: new VueRouter(routes),
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
