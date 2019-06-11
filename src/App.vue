<template>
  <div>
    <div class="custom-navigation">
      <button @click="isActive = !isActive">toggle custom navigation</button>
      <div class="controls" v-if="isActive">
        {{ dynamicLineWidth }}px<br />
        <input
          type="range"
          @input="dynamicLineWidth = +$event.target.value"
          min="1"
          max="100"
        />
        <input type="color" v-model="color" /><br /><br />
        <button @click="$refs.paintable.undoDrawingStep">undo</button>
        <button @click="$refs.paintable.redoDrawingStep">redo</button>
        <button @click="$refs.paintable.clearCanvas">clear</button><br /><br />
        <button @click="$refs.paintable.saveCurrentCanvasToStorage">
          save
        </button>
        <button @click="$refs.paintable.cancelDrawing">cancel</button>
        <button @click="useEraser = !useEraser">
          {{ !useEraser ? 'eraser' : 'pencil' }}
        </button>
      </div>
    </div>

    <paintable
      :active="isActive"
      :width="800"
      :height="800"
      :disableNavigation="disableNavigation"
      :hide="hidePaintable"
      :horizontalNavigation="true"
      :navigation="navigation"
      :name="isFirstPaintable ? 'my-screen' : 'my-second-screen'"
      :factor="1"
      :lineWidth="dynamicLineWidth"
      :lineWidthEraser="20"
      :useEraser="useEraser"
      :color="color"
      class="paint"
      ref="paintable"
      @toggle-paintable="toggledPaintable"
    >
      <div class="control">
        <h3>
          Paintable <strong>{{ isFirstPaintable ? '1' : '2' }}</strong>
        </h3>
        <button @click="hidePaintable = !hidePaintable">show/hide</button>
        <button @click="disableNavigation = !disableNavigation">
          toggle navigation
        </button>
        <button @click="navigate">switch to another paintable</button>
      </div>

      <img
        :src="
          `https://source.unsplash.com/collection/195845/800x80${
            isFirstPaintable ? 0 : 1
          }`
        "
      />
    </paintable>
    <footer>
      <a
        class="github-link"
        _target="blank"
        href="https://github.com/ph1p/vue-paintable"
        >on github</a
      >
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFirstPaintable: true,
      hidePaintable: false,
      disableNavigation: false,
      dynamicLineWidth: 5,
      isActive: false,
      useEraser: false,
      color: '#000'
    };
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
    },
    toggledPaintable(isActive) {
      this.isActive = isActive;
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
  overflow: hidden;
}
footer {
  text-align: center;
}
footer a {
  color: #777;
  text-transform: uppercase;
  text-decoration: none;
}
button {
  border: 0;
  margin: 0 10px 0 0;
  font-size: 14px;
  padding: 10px 15px;
  opacity: 0.8;
  background-color: rgb(19, 102, 141);
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
}
button:hover {
  opacity: 1;
}
.custom-navigation {
  position: fixed;
  top: 40px;
  left: 40px;
  z-index: 1001;
  background-color: #fff;
}
.custom-navigation .controls {
  margin: 10px 0 0 0;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 5px;
}
</style>
