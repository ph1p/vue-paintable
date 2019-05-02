import Vue from 'vue';
import App from './App.vue';
import Paintable from '../dist/paintable.common';

Vue.use(Paintable);

new Vue({
  render: h => h(App)
}).$mount('#app');
