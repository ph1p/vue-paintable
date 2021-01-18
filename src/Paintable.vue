<template>
  <div class="paintable" v-if="!hide">
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

export default {
  name: 'paintable',
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
        const restoreState = pop.pop();
        this.saveCurrentCanvasState(this.canvas, push, true);
        this.loadImageFromStorage(restoreState);
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
        const dummyImage = new Image();
        dummyImage.onload = () => {
          this.ctx.drawImage(dummyImage, 0, 0);
          this.canvasIsEmpty = this.isCanvasBlank();
        };
        dummyImage.src = base64Image; // eslint-disable-line
      } else {
        this.canvasIsEmpty = this.isCanvasBlank();
      }
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
            (x - this.tempCanvas.getBoundingClientRect().left) * this.factor;
          currentY =
            (y - this.tempCanvas.getBoundingClientRect().top) * this.factor;

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
    drawLine(context, isTemporaryLine = false) {
      const points = this.pointCoords.filter(
        (e, i) => i % (isTemporaryLine ? 10 : 25) === 0
      );
      this.tempCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      context.beginPath();
      context.moveTo(points[0].x, points[0].y);

      for (let point = 0; point < points.length - 1; point++) {
        const p0 = point > 0 ? points[point - 1] : points[0];
        const p1 = points[point];
        const p2 = points[point + 1];
        const p3 = point != points.length - 2 ? points[point + 2] : p2;

        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;

        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;

        context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
      }
      context.stroke();
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
            (x - this.tempCanvas.getBoundingClientRect().left) * this.factor;
          currentY =
            (y - this.tempCanvas.getBoundingClientRect().top) * this.factor;

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
                this.$emit('threshold-reached');
              }
            }
          }

          this.drawLine(!this.isEraserActive ? this.tempCtx : this.ctx, true);
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
