import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router'
import routes from './router/index'
import Vodal from 'vodal';





Vue.component(Vodal.name, Vodal);
Vue.config.productionTip = false



import BootstrapVue from 'bootstrap-vue'
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
    connection: 'ws://agile-everglades-15507.herokuapp.com',
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
    options: {} //Optional options
}))

/////

window.Evento = new Vue();




Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//@import "vodal/common.css";
//@import "vodal/rotate.css";
Vue.use(VueRouter)

new Vue({
  store,
  router: new VueRouter(routes),
  render: function (h) { return h(App) }
}).$mount('#app')