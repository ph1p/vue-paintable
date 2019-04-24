<template>
  <div>
    <paintable
      :width="800"
      :height="800"
      :hide="hidePaintable"
      :horizontalNavigation="true"
      :navigation="navigation"
      :name="isFirstPaintable ? 'my-screen' : 'my-second-screen'"
      :factor="1"
      :lineWidth="5"
      :lineWidthEraser="20"
      alwaysOnTop
      class="paint"
    >
      <div class="control">
        <h3>
          Paintable <strong>{{ isFirstPaintable ? '1' : '2' }}</strong>
        </h3>
        <button @click="hidePaintable = !hidePaintable">show/hide</button>
        <button @click="show">show navigation</button>
        <button @click="hide">hide navigation</button>
        <button @click="navigate">switch to another paintable</button>
      </div>

      <img
        :src="
          `https://source.unsplash.com/collection/837167/800x80${
            isFirstPaintable ? 0 : 1
          }`
        "
      />
    </paintable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFirstPaintable: true,
      hidePaintable: false
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
          body: 'click here!',
          activeBody: '<strong>save</strong>'
        },
        color: {
          body: 'color'
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
body {
  font-family: Helvetica, Arial, sans-serif;
  position: initial !important;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h3 {
  font-weight: normal;
}
.control {
  margin: 20px;
}
.paint {
  border: 5px solid #000;
  border-radius: 5px;
  margin: 40px auto;
  box-sizing: border-box;
  display: block;
  width: 810px !important;
  height: 810px !important;
  position: relative !important;
}
</style>
