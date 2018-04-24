import Vue from 'vue';
import Paintable from './index';

Vue.use(Paintable);

new Vue({
    template: `
    <paintable-screen name="my-screen" :showUndoRedo="false" :showLineWidth="false" :lineWidth="10" :colors="[]" :hide="false">
        test
    </paintable-screen>
    `
}).$mount('#app');