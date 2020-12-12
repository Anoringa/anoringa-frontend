import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router'
import routes from './router/index'

import Vodal from 'vodal';

Vue.component(Vodal.name, Vodal);
Vue.config.productionTip = false



import BootstrapVue from 'bootstrap-vue'

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