if (process.env.VUE_APP_FALLBACK) {
  require('pepjs');
}

import Paintable from './Paintable.vue';

interface PaintableOptions {
  setItem: any;
  getItem: any;
  removeItem: any;
}

const PaintablePlugin = {
  install(Vue: any, options: PaintableOptions) {
    if (options && options.setItem) {
      Paintable.methods.setItem = options.setItem;
    }

    if (options && options.getItem) {
      Paintable.methods.getItem = options.getItem;
    }

    if (options && options.removeItem) {
      Paintable.methods.removeItem = options.removeItem;
    }

    Vue.component('paintable', Paintable);

    Vue.prototype.$hidePaintableNavigation = function() {
      setTimeout(() => {
        this.$root.$emit('hide-paintable-navigation', true);
      }, 0);
    };

    Vue.prototype.$showPaintableNavigation = function() {
      setTimeout(() => {
        this.$root.$emit('hide-paintable-navigation', false);
      }, 0);
    };
  }
};

export default PaintablePlugin;
