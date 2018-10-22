// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css'
import Header from './components/Header'
import List from './components/List'

import {$axios} from './axios'

import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css'; 

import { Toast } from 'mint-ui';
window.Toast= Toast;

import VueBetterScroll from 'vue2-better-scroll'
import { Loadmore } from 'mint-ui';

import { Spinner } from 'mint-ui';

Vue.component(Spinner.name, Spinner);

Vue.component(Loadmore.name, Loadmore);

Vue.use(VueBetterScroll)

Vue.component('Header',Header)
Vue.component('List',List)

Vue.config.productionTip = false

Vue.prototype.$axios = $axios;

import store from './store'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
