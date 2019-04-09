<template>
  <div>
    <strong>{{ isFirstPaintable ? 'current 1 (mouse)' : 'current 2 (touch)' }}</strong>
    <button @click="show">show navigation</button>
    <button @click="hide">hide navigation</button>
    <button @click="navigate">switch to another paintable</button>
    <paintable-screen
      :navigation="navigation"
      :useMouse="isFirstPaintable"
      displayHorizontal
      :name="isFirstPaintable ? 'my-screen' : 'my-second-screen'"
      :factor="1"
      :lineWidth="5"
      :lineWidthEraser="20"
      alwaysOnTop
    >
      <img src="https://placehold.it/500/500" />
    </paintable-screen>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFirstPaintable: true
    };
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
      };
    }
  },
  methods: {
    navigate() {
      this.isFirstPaintable = !this.isFirstPaintable;
    },
    hide() {
      this.$hidePaintableNavigation();
    },
    show() {
      this.$showPaintableNavigation();
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
