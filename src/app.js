import Vue from 'vue';
import Paintable from './index';

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

new Vue({
    template: `
    <paintable-screen name="my-screen" :showUndoRedo="false" :showLineWidth="false" :lineWidth="10" :colors="[]" :hide="false">
        test
    </paintable-screen>
    `,
    mounted() {
        this.$root.$on('toggle-paintable-screen', isActive => {
            console.log(isActive);
        });

        this.$hidePaintableNavigation();
    }
}).$mount('#app');