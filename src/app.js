import Vue from 'vue';
import Paintable from './index';

Vue.use(Paintable);

new Vue({
    template: `
    <paintable-screen name="my-screen" :undoRedo="false" :hide="false">
        test
    </paintable-screen>
    `
}).$mount('#app');