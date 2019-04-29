import Paintable from './Paintable.vue';

const PaintablePlugin = {
  install(Vue, options) {
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
  }
};

export default PaintablePlugin;
