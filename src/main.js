import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router'
import routes from './router/index'
import Vodal from 'vodal';

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

import Meta from 'vue-meta'
Vue.use(Meta)



import Vue2Filters from 'vue2-filters'
Vue.use(Vue2Filters)


Vue.component(Vodal.name, Vodal);
Vue.config.productionTip = false

//Vue.prototype.$apiurl = 'approved'
Vue.prototype.$apiurl = 'approved'



import VueImageBrightness from 'vue-image-brightness' 
Vue.use(VueImageBrightness)



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
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
    debug: true,
    //connection: 'ws://localhost:3000',
    //connection: 'ws://agile-everglades-15507.herokuapp.com',
    //connection: 'https://agile-everglades-15507.herokuapp.com',
    connection: process.env.VUE_APP_SOCKETIO,
    //connection: 'ws://localhost:3000',
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
    options: {} //Optional options
}))

/////


//window.Evento = new Vue();


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
import './registerServiceWorker'
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
//@import "vodal/common.css";
//@import "vodal/rotate.css";
Vue.use(VueRouter)

new Vue({
  store,
  router: new VueRouter(routes),
  render: function (h) { return h(App) }
}).$mount('#app')