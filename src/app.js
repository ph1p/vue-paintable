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
    <div>
        <paintable-screen name="my-screen" :showUndoRedo="false" :showLineWidth="false" :lineWidth="10" :colors="[]" :hide="!isFirstPaintable">
            test <strong>{{isFirstPaintable ? 'current view' : ''}}</strong>
            <button @click="show">show</button>
            <button @click="hide">hide</button>
            <button @click="navigate">toggle paintable</button>
        </paintable-screen>
        <paintable-screen name="my-screen-2" :showUndoRedo="false" :showLineWidth="false" :lineWidth="10" :colors="[]" :hide="isFirstPaintable">
            <br><br>test2 <strong>{{!isFirstPaintable ? 'current view' : ''}}</strong>
            <button @click="show">show</button>
            <button @click="hide">hide</button>
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