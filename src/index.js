/**
 * Copyright (C) 2018 Philip Stapelfeldt (p.stapelfeldt@appcom-interactive.de)
 * appcom interactive GmbH
 */
import Paintable from './paintable.vue';

const PaintablePlugin = {
  install(Vue, options) {
    if (options.setItem) {
      Paintable.methods.setItem = options.setItem;
    }

    if (options.getItem) {
      Paintable.methods.getItem = options.getItem;
    }

    Vue.component('paintable', Paintable);

    // deprecated
    Vue.component('paintable-screen', Paintable);

    Vue.prototype.$hidePaintableNavigation = function () {
      setTimeout(() => {
        this.$root.$emit('hide-paintable-navigation', true);
      }, 0);
    };

    Vue.prototype.$showPaintableNavigation = function () {
      setTimeout(() => {
        this.$root.$emit('hide-paintable-navigation', false);
      }, 0);
    };
  }
}

export default PaintablePlugin;