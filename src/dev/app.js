import Vue from 'vue';
import Paintable from '../index';

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
    <div>
        <strong>{{isFirstPaintable ? 'current 1 (mouse)' : 'current 2 (touch)'}}</strong>
        <button @click="show">show navigation</button>
        <button @click="hide">hide navigation</button>
        <button @click="navigate">toggle paintable</button>
        <paintable-screen name="my-screen" :lineWidth="10" :hide="!isFirstPaintable" useMouse alwaysOnTop>
            <img src="https://placehold.it/500/500">
        </paintable-screen>
        <paintable-screen name="my-screen-2" :showUndoRedo="false" :showLineWidth="false" :lineWidth="10" :colors="[]" :hide="isFirstPaintable">

        </paintable-screen>
    </div>
    `,
    data() {
        return {
            isFirstPaintable: true
        }
    },
    mounted() {
        this.$root.$on('toggle-paintable-screen', isActive => {
            console.log(isActive);
        });
    },
    methods: {
        navigate() {
            this.isFirstPaintable = !this.isFirstPaintable
        },
        hide() {
            this.$hidePaintableNavigation();
        },
        show() {
            this.$showPaintableNavigation();
        }
    }
}).$mount('#app');