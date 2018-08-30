<template>
  <div>
    <div class="paintable" v-show="!hide">
        <Navigation :displayHorizontal="displayHorizontal">
          <div slot="paintable-navigation-draw"></div>
        </Navigation>

        <div v-if="useMouse">
          <canvas :ref="'canvas-' + canvasId" :class="{active: isActive || alwaysOnTop}" v-show="!canvasIsEmpty || isActive" class="canvas back"
            :width="width"
            :height="height"
            @mousemove="drawMove"
            @mousedown="drawStart"
            @mouseup="drawEnd" />

          <canvas :ref="'temp-canvas-' + canvasId" :class="{active: isActive || alwaysOnTop}" v-show="!canvasIsEmpty || isActive" class="canvas"
            :width="width"
            :height="height"
            @mousemove="drawMove"
            @mousedown="drawStart"
            @mouseup="drawEnd" />
        </div>
        <div v-else>
          <canvas :ref="'canvas-' + canvasId" :class="{active: isActive || alwaysOnTop}" v-show="!canvasIsEmpty || isActive" class="canvas back"
            :width="width"
            :height="height"
            @touchmove="drawMove"
            @touchstart="drawStart"
            @touchend="drawEnd" />

          <canvas :ref="'temp-canvas-' + canvasId" :class="{active: isActive || alwaysOnTop}" v-show="!canvasIsEmpty || isActive" class="canvas"
            :width="width"
            :height="height"
            @touchmove="drawMove"
            @touchstart="drawStart"
            @touchend="drawEnd" />
        </div>
        <div v-if="!hide" class="content">
            <slot></slot>
        </div>
    </div>
    <div v-if="hide" class="content">
        <slot></slot>
    </div>
  </div>
</template>

<script>
let previousX = 0;
let previousY = 0;
let currentX = 0;
let currentY = 0;

import Navigation from './components/navigation';

export default {
  name: 'paintable',
  components: {
    Navigation
  },
  props: {
    factor: {
      type: Number,
      default: 1
    },
    navigation: {
      type: Object,
      default: null
    },
    alwaysOnTop: {
      type: Boolean,
      default: false
    },
    useMouse: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: window.innerWidth
    },
    height: {
      type: Number,
      default: window.innerHeight
    },
    hide: {
      type: Boolean,
      default: false
    },
    showUndoRedo: {
      type: Boolean,
      default: true
    },
    showLineWidth: {
      type: Boolean,
      default: true
    },
    lineWidth: {
      type: Number,
      default: 5
    },
    lineWidthEraser: {
      type: Number,
      default: 20
    },
    colors: {
      type: Array,
      default: () => ['black', '#f00', '#4481c7', 'rgba(255, 235, 59, 0.4)', '#999', 'green']
    },
    displayHorizontal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hidePaintableNavigation: false,
      currentColor: 'black',
      canvasIsEmpty: false,
      canvasId: 0,
      isEraserActive: false,
      isActive: false,
      pointCoords: [],
      redoList: [],
      undoList: [],
      currentLineWidth: this.isEraserActive ? this.lineWidthEraser : this.lineWidth,
      tempCanvas: null,
      tempCtx: null,
      canvas: null,
      ctx: null,
      startedDrawing: false
    };
  },
  watch: {
    isActive: 'init',
    name: 'init',
    // hide: 'init',
    isEraserActive(isActive) {
      this.currentLineWidth = isActive ? this.lineWidthEraser : this.lineWidth;
    },
    currentLineWidth(lineWidth) {
      this.ctx.lineWidth = lineWidth;
      this.tempCtx.lineWidth = lineWidth;
    },
    color(color) {
      this.ctx.strokeStyle = color;
      this.tempCtx.strokeStyle = color;
    }
  },
  beforeMount() {
    this.canvasId = Math.round(Math.random() * 1000);
  },
  mounted() {
    this.init();
  },
  computed: {
    /**
     * Get scaling factor of current device
     */
    scalingFactor() {
      return window.devicePixelRatio || 1;
    }
  },
  methods: {
    /**
     * Set storage item
     * @param {string} key
     * @param {string} value
     */
    setItem(key, value) {
      localStorage.setItem(key, value);
    },
    /**
     * Get storage item
     * @param {string} key
     */
    async getItem(key) {
      return localStorage.getItem(key);
    },
    /**
     * Remove item from storage
     * @param {string} key
     */
    removeItem(key) {
      localStorage.removeItem(key);
    },
    /**
     * Init paintable component and set all variables
     */
    init() {
      try {
        this.pointCoords = [];

        // temporary canvas
        this.tempCanvas = this.$refs['temp-canvas-' + this.canvasId];
        this.tempCtx = this.tempCanvas.getContext('2d');

        // canvas with drawing
        this.canvas = this.$refs['canvas-' + this.canvasId];
        this.ctx = this.canvas.getContext('2d');

        this.tempCtx.lineCap = 'round';
        this.ctx.lineCap = 'round';

        this.tempCtx.lineWidth = this.lineWidth;
        this.ctx.lineWidth = this.lineWidth;

        this.tempCtx.strokeStyle = this.currentColor;
        this.ctx.strokeStyle = this.currentColor;

        this.setItem(
          this.name + '-settings',
          JSON.stringify({
            width: this.canvas.width,
            height: this.canvas.height
          })
        );

        // set canvas width and height
        this.setCanvasSize();

        // load image from storage
        this.loadImageFromStorage();

        // listen to hide event
        this.$root.$on('hide-paintable-navigation', hidePaintableNavigation => {
          this.hidePaintableNavigation = hidePaintableNavigation;
        });
      } catch (err) {
        // this.hide = true;
        // this.hidePaintableNavigation = true;
      }
    },
    //--------------------------------------------------
    /**
     * Undo drawed line
     */
    undoDrawingStep() {
      this.restoreCanvasState(this.undoList, this.redoList);
    },
    /**
     * Redo drawed line
     */
    redoDrawingStep() {
      this.restoreCanvasState(this.redoList, this.undoList);
    },
    /**
     * Restore previous image
     */
    restoreCanvasState(pop, push) {
      this.ctx.globalCompositeOperation = 'source-over';
      if (pop.length) {
        const restore_state = pop.pop();
        this.saveCurrentCanvasState(this.canvas, push, true);
        this.loadImageFromStorage(restore_state);
      }
    },
    /**
     * Save the current canvas state an push it to undo- or redolist
     */
    saveCurrentCanvasState(canvas, list, keep_redo) {
      keep_redo = keep_redo || false;
      if (!keep_redo) {
        this.redoList = [];
      }

      (list || this.undoList).push(canvas.toDataURL('image/png'));
    },
    //-------------------------------------------------------------------------
    /**
     * Get base64 from local storage and load it into canvas
     */
    async loadImageFromStorage(image) {
      this.clearCanvas();

      const base64Image = image || (await this.getItem(this.name));
      if (base64Image) {
        let image = new Image();
        image.onload = () => {
          this.ctx.drawImage(image, 0, 0);
          this.canvasIsEmpty = this.isCanvasBlank();
        };
        image.src = base64Image;
      } else {
        this.canvasIsEmpty = this.isCanvasBlank();
      }
    },
    /**
     * Set current canvas size
     */
    setCanvasSize() {
      // this.width = window.innerWidth;
      // this.height = window.innerHeight;
      currentX = 0;
      currentY = 0;
    },
    /**
     * Clear complete canvas
     */
    clearCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    isCanvasBlank() {
      const blank = document.createElement('canvas');
      const blankCtx = blank.getContext('2d');

      blankCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      blank.width = this.canvas.width;
      blank.height = this.canvas.height;

      return blank.toDataURL() === this.canvas.toDataURL();
    },
    /**
     * Check first, if canvas is empty.
     * If its not empty save it to the storage.
     */
    saveCurrentCanvasToStorage() {
      if (this.isCanvasBlank()) {
        this.removeItem(this.name);
        this.removeItem(this.name + '-settings');
      } else {
        this.setItem(this.name, this.canvas.toDataURL('image/png'));
        this.setItem(
          this.name + '-settings',
          JSON.stringify({
            width: this.canvas.width,
            height: this.canvas.height
          })
        );
      }
      this.undoList = [];
      this.redoList = [];

      this.canvasIsEmpty = this.isCanvasBlank();
    },
    //-------------------------------------------------------------------------
    /**
     * Start drawing lines
     */
    drawStart(e) {
      e.preventDefault();

      if (this.isActive) {
        this.isLineWidthPickerOpen = false;
        this.isColorPickerOpen = false;
        this.startedDrawing = true;

        this.saveCurrentCanvasState(this.canvas);

        previousX = currentX;
        previousY = currentY;

        currentX =
          (!this.useMouse ? e.targetTouches[0].clientX : e.clientX) * this.factor -
          this.tempCanvas.getBoundingClientRect().left;
        currentY =
          (!this.useMouse ? e.targetTouches[0].clientY : e.clientY) * this.factor -
          this.tempCanvas.getBoundingClientRect().top;

        this.pointCoords.push({
          x: currentX,
          y: currentY
        });

        this.tempCtx.globalCompositeOperation = 'source-over';
        this.ctx.globalCompositeOperation = this.isEraserActive ? 'destination-out' : 'source-over';
      }
    },
    /**
     * End of drawing a line
     */
    drawEnd(e) {
      if (this.isActive) {
        this.drawLine(this.ctx);
        this.startedDrawing = false;

        this.pointCoords = [];
      }
    },
    /**
     * Generate line from points array
     */
    drawLine(context) {
      this.tempCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      let p1 = this.pointCoords[0];
      let p2 = this.pointCoords[1];

      context.beginPath();
      context.moveTo(p1.x, p1.y);

      for (let i = 1, len = this.pointCoords.length; i < len; i++) {
        let midPoint = {
          x: p1.x + (p2.x - p1.x) / 2,
          y: p1.y + (p2.y - p1.y) / 2
        };
        context.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
        p1 = this.pointCoords[i];
        p2 = this.pointCoords[i + 1];
      }

      context.lineTo(p1.x, p1.y);
      context.stroke();
      context.closePath();
    },
    /**
     * Draw line on move and add current position to an array
     */
    drawMove(e) {
      e.preventDefault();

      if (this.isActive && this.startedDrawing) {
        previousX = currentX;
        previousY = currentY;

        currentX =
          (!this.useMouse ? e.targetTouches[0].clientX : e.clientX) * this.factor -
          this.tempCanvas.getBoundingClientRect().left;
        currentY =
          (!this.useMouse ? e.targetTouches[0].clientY : e.clientY) * this.factor -
          this.tempCanvas.getBoundingClientRect().top;

        this.pointCoords.push({
          x: currentX,
          y: currentY
        });

        this.drawLine(!this.isEraserActive ? this.tempCtx : this.ctx);
      }
    }
  }
};
</script>
<style>
</style>

<style lang="scss">
body {
  position: fixed;
}
.paintable {
  overflow: hidden;
  position: fixed;
  height: 100%;
  width: 100%;
  transform: scale(1);
  &.active {
    z-index: 0;
  }

  .canvas {
    position: relative;
    background-color: transparent;
    z-index: -1;
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    &.active {
      z-index: 1000;
      &.back {
        z-index: 999;
      }
    }
  }
}
</style>
