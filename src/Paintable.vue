<template>
  <div class="paintable" v-if="!hide">
    <Navigation
      v-if="!disableNavigation"
      :horizontalNavigation="horizontalNavigation"
    >
      <div slot="paintable-navigation-draw"></div>
    </Navigation>

    <canvas
      :ref="'canvas-' + canvasId"
      :class="{ active: isActive || alwaysOnTop }"
      :style="{
        pointerEvents: !isActive ? 'none' : 'all',
        display: !canvasIsEmpty || isActive ? 'block' : 'none'
      }"
      class="canvas back"
      :width="width"
      :height="height"
    />

    <canvas
      :ref="'temp-canvas-' + canvasId"
      :class="{ active: isActive || alwaysOnTop }"
      :style="{
        pointerEvents: !isActive ? 'none' : 'all',
        display: !canvasIsEmpty || isActive ? 'block' : 'none'
      }"
      class="canvas"
      :width="width"
      :height="height"
      @[drawMoveEvent]="drawMove"
      @[drawStartEvent]="drawStart"
      @[drawEndEvent]="drawEnd"
    />

    <div class="content">
      <slot></slot>
    </div>
  </div>
  <div v-else class="content">
    <slot></slot>
  </div>
</template>

<script>
let currentX = 0;
let currentY = 0;

import Navigation from './components/Navigation';

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
      default: true
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
    threshold: {
      type: Number,
      default: 0
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
      default: () => [
        'black',
        '#f00',
        '#4481c7',
        'rgba(255, 235, 59, 0.4)',
        '#999',
        'green'
      ]
    },
    horizontalNavigation: {
      type: Boolean,
      default: false
    },
    disableNavigation: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#000'
    },
    useEraser: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentColor: this.color,
      canvasIsEmpty: false,
      canvasId: 0,
      isEraserActive: this.useEraser,
      isActive: this.active,
      pointCoords: [],
      redoList: [],
      undoList: [],
      currentLineWidth: this.isEraserActive
        ? this.lineWidthEraser
        : this.lineWidth,
      tempCanvas: null,
      tempCtx: null,
      canvas: null,
      ctx: null,
      startedDrawing: false,
      drawMoveEvent: 'mousemove',
      drawStartEvent: 'mousedown',
      drawEndEvent: 'mouseup',
      isMouse: true,
      thresholdReached: false
    };
  },
  watch: {
    isActive: 'init',
    name: 'init',
    hide() {
      this.$nextTick(() => {
        this.init();
      });
    },
    lineWidth(lineWidth) {
      this.currentLineWidth = lineWidth;
    },
    lineWidthEraser(lineWidth) {
      this.currentLineWidth = lineWidth;
    },
    useEraser(useEraser) {
      this.isEraserActive = useEraser;
    },
    active(isActive) {
      this.isActive = isActive;
    },
    color(color) {
      this.currentColor = color;
      this.tempCtx.strokeStyle = this.currentColor;
      this.ctx.strokeStyle = this.currentColor;
    },
    isEraserActive(isActive) {
      this.currentLineWidth = isActive ? this.lineWidthEraser : this.lineWidth;
    },
    currentLineWidth(lineWidth) {
      this.ctx.lineWidth = lineWidth;
      this.tempCtx.lineWidth = lineWidth;
    }
  },
  beforeMount() {
    this.canvasId = Math.round(Math.random() * 1000);
  },
  created() {
    if (this.isTouch) {
      this.drawMoveEvent = 'touchmove';
      this.drawStartEvent = 'touchstart';
      this.drawEndEvent = 'touchend';
      this.isMouse = false;
    }
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
    },
    /**
     * Check if it is a touch device
     * thanks to: https://ctrlq.org/code/19616-detect-touch-screen-javascript
     */
    isTouch() {
      return (
        'ontouchstart' in window ||
        navigator.MaxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    }
  },
  methods: {
    /**
     * Cancel current drawing and remove lines
     */
    cancelDrawing() {
      this.loadImageFromStorage();
      this.isActive = false;
      this.isColorPickerOpen = false;
      this.isLineWidthPickerOpen = false;
    },
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

        this.$emit('toggle-paintable', this.isActive);
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
    saveCurrentCanvasState(canvas, list, keepRedo) {
      keepRedo = keepRedo || false;
      if (!keepRedo) {
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
        image.src = base64Image; // eslint-disable-line
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
      this.ctx.globalCompositeOperation = 'source-over';

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
      // reset to pencil
      this.isEraserActive = false;

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
      this.thresholdReached = false;
      if (this.isActive) {
        this.isLineWidthPickerOpen = false;
        this.isColorPickerOpen = false;
        this.startedDrawing = true;

        this.saveCurrentCanvasState(this.canvas);

        const x = !this.isMouse ? e.targetTouches[0].clientX : e.clientX;
        const y = !this.isMouse ? e.targetTouches[0].clientY : e.clientY;

        if (x && y) {
          currentX =
            x * this.factor - this.tempCanvas.getBoundingClientRect().left;
          currentY =
            y * this.factor - this.tempCanvas.getBoundingClientRect().top;

          this.pointCoords.push({
            x: currentX,
            y: currentY
          });
        }

        this.tempCtx.globalCompositeOperation = 'source-over';
        this.ctx.globalCompositeOperation = this.isEraserActive
          ? 'destination-out'
          : 'source-over';
      }
    },
    /**
     * End of drawing a line
     */
    drawEnd() {
      if (this.isActive) {
        this.drawLine(this.ctx);
        this.startedDrawing = false;

        this.pointCoords = [];
        this.thresholdReached = false;
      }
    },
    /**
     * Generate line from points array
     */
    drawLine(context) {
      this.tempCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      let p1 = this.pointCoords[0];
      let p2 = this.pointCoords[1];

      if (p1 && p2 && p1.x && p1.y) {
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
      }
    },
    /**
     * Draw line on move and add current position to an array
     */
    drawMove(e) {
      e.preventDefault();

      if (this.isActive && this.startedDrawing) {
        const x = !this.isMouse ? e.targetTouches[0].clientX : e.clientX;
        const y = !this.isMouse ? e.targetTouches[0].clientY : e.clientY;

        if (x && y) {
          currentX =
            x * this.factor - this.tempCanvas.getBoundingClientRect().left;
          currentY =
            y * this.factor - this.tempCanvas.getBoundingClientRect().top;

          this.pointCoords.push({
            x: currentX,
            y: currentY
          });

          if (this.threshold) {
            const distanceFirstAndLastPoint = Math.sqrt(
              Math.pow(
                this.pointCoords[this.pointCoords.length - 1].y -
                  this.pointCoords[0].y,
                2
              ) +
                Math.pow(
                  this.pointCoords[this.pointCoords.length - 1].x -
                    this.pointCoords[0].x,
                  2
                )
            );

            if (distanceFirstAndLastPoint > this.threshold) {
              if (!this.thresholdReached) {
                this.thresholdReached = true;
                this.$emit('thresholdReached');
              }
            }
          }

          this.drawLine(!this.isEraserActive ? this.tempCtx : this.ctx);
        }
      }
    }
  }
};
</script>

<style>
body {
  position: fixed;
}
.paintable {
  overflow: hidden;
  position: fixed;
  height: 100%;
  width: 100%;
  transform: scale(1);
}
.paintable.active {
  z-index: 0;
}
.paintable .canvas {
  position: relative;
  background-color: transparent;
  z-index: -1;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  touch-action: none;
}
.paintable .canvas.active {
  z-index: 1000;
}
.paintable .canvas.active.back {
  z-index: 999;
}
</style>
