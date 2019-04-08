import Vue from 'vue';
import App from './App.vue';
import Paintable from '../../src/index.js';

Vue.use(Paintable, {
  setItem(key, value) {
    localStorage.setItem(key, value);
  },
  async getItem(key) {
    return localStorage.getItem(key);
  },
  removeItem(key) {
    localStorage.removeItem(key);
  }
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
