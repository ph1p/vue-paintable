import Vue from 'vue';

declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'vue/types/vue' {
  interface VueConstructor {
    $hidePaintableNavigation: Function;
    $showPaintableNavigation: Function;
  }
}
