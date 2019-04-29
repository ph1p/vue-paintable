import Vue from 'vue';
import App from './App.vue';
import Paintable from './plugin';

Vue.use(Paintable);

new Vue({
  render: h => h(App)
}).$mount('#app');
