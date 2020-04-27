import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 引入全局样式
import './global/glb.css'
import * as http from './api'
// 将请求方式给 Vue的原型 方便发送请求
Vue.prototype.$http = http 
// 按需引入element-ui
import './plugins/element.js';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
