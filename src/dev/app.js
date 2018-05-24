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
        <button @click="navigate">switch to another paintable</button>
        <paintable-screen :navigation="navigation"
        :name="isFirstPaintable ? 'my-screen' : 'my-second-screen'" :lineWidth="10" useMouse alwaysOnTop>
            <img src="https://placehold.it/500/500">
        </paintable-screen>
    </div>
    `,
    data() {
        return {
            isFirstPaintable: true
        }
    },
    mounted() {
        this.$root.$on('toggle-paintable', isActive => {
            console.log('paintable', isActive);
        });
    },
    computed: {
        navigation() {
            return {
                'draw-save': {
                    body: 'draw :)',
                    activeBody: '<strong>save</strong>'
                },
                color: {
                    body: 'CP'
                }
            }
        }
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