<template>
  <div>
    <div class="paintable" v-show="!hide && !hidePaintable">
        <div class="navigation">
          <div class="navigationBtn save" @click="togglePainting">
              <span v-if="isActive" @click="saveCurrentCanvasToStorage">save</span>
              <span v-else>draw</span>
          </div>
          <span v-if="isActive">
            <span class="color" v-if="colors.length > 0">
              <div class="color__picker" v-if="isColorPickerOpen">
                <span :class="['color__pickerColor', {selected: currentColor === color}]" v-for="color in colors" :key="color" :style="{backgroundColor: color}" @click="changeColor(color); isColorPickerOpen = false;"></span>
              </div>
              <div class="navigationBtn" @click="isColorPickerOpen = !isColorPickerOpen; isLineWidthPickerOpen = false;">
                color
              </div>
            </span>
            <span class="linewidth" v-if="showLineWidth">
              <div class="linewidth__picker" v-if="isLineWidthPickerOpen">
                <label for="linewidth__picker">({{currentLineWidth}}px):</label>
                <input id="paintable-font-size" type="range" min="1" max="100" v-model="currentLineWidth" @change="isLineWidthPickerOpen = false">
                <div class="paintableLineWidth" :style="{height: currentLineWidth + 'px', width: currentLineWidth + 'px', backgroundColor: this.currentColor}"></div>
              </div>
              <div class="navigationBtn navigationBtn--linewidth" @click="isLineWidthPickerOpen = !isLineWidthPickerOpen; isColorPickerOpen = false;">
                line-width
              </div>
            </span>

            <span v-if="showUndoRedo">
              <div class="navigationBtn navigationBtn--undo" @click="undoDrawingStep" :class="{disabled: !undoList.length}">undo</div>
              <div class="navigationBtn navigationBtn--redo" @click="redoDrawingStep" :class="{disabled: !redoList.length}">redo</div>
            </span>

            <div class="navigationBtn navigationBtn--clear" @click="clearCanvas">delete</div>
            <div class="navigationBtn navigationBtn--eraser" @click="isEraserActive = !isEraserActive">
                <span v-if="!isEraserActive">eraser</span>
                <span v-else>pencil</span>
            </div>
            <div class="navigationBtn navigationBtn--cancel" @click="cancelDrawing">cancel</div>
          </span>
          </div>

        <canvas :id="'canvas-' + canvasId" :class="{active: isActive}" class="canvas back"
        :width="width"
        :height="height"
        @touchmove="drawMove"
        @touchstart="drawStart"
        @touchend="drawEnd" />

        <canvas :id="'temp-canvas-' + canvasId" v-show="!isEraserActive" :class="{active: isActive}" class="canvas"
        :width="width"
        :height="height"
        @touchmove="drawMove"
        @touchstart="drawStart"
        @touchend="drawEnd" />

        <div v-if="!hide && !hidePaintable" class="content">
            <slot></slot>
        </div>
    </div>
    <div v-if="hide || hidePaintable" class="content">
        <slot></slot>
    </div>
  </div>
</template>

<script>
/**
 * Copyright (C) 2018 Philip Stapelfeldt (p.stapelfeldt@appcom-interactive.de)
 * appcom interactive GmbH
 */
export default {
  name: 'paintable',
  props: {
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
    colors: {
      type: Array,
      default: () => ['black', '#f00', '#4481c7', 'rgba(255, 235, 59, 0.4)', '#999', 'green']
    }
  },
  data() {
    return {
      hidePaintable: false,
      currentColor: 'black',
      canvasId: 0,
      isEraserActive: false,
      isActive: false,
      pointCoords: [],
      redoList: [],
      undoList: [],
      currentLineWidth: this.lineWidth,
      isColorPickerOpen: false,
      isLineWidthPickerOpen: false,
      previousX: 0,
      previousY: 0,
      currentX: 0,
      currentY: 0,
      tempCanvas: null,
      tempCtx: null,
      canvas: null,
      ctx: null
    };
  },
  watch: {
    name: 'init',
    hide: 'init',
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
    setItem(key, value) {
      localStorage.setItem(key, value);
    },
    async getItem(key) {
      return localStorage.getItem(key);
    },
    removeItem(key) {
      localStorage.removeItem(key);
    },
    togglePainting() {
      this.isActive = !this.isActive;

      // emit root event
      this.$root.$emit('toggle-paintable-screen', this.isActive);
    },
    /**
     * Init paintable component and set all variables
     */
    init() {
      try {
        this.pointCoords = [];

        // temporary canvas
        this.tempCanvas = document.getElementById('temp-canvas-' + this.canvasId);
        this.tempCtx = this.tempCanvas.getContext('2d');

        // canvas with drawing
        this.canvas = document.getElementById('canvas-' + this.canvasId);
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
            width: this.width,
            height: this.height
          })
        );

        // set canvas width and height
        this.setCanvasSize();

        // load image from storage
        this.loadImageFromStorage();

        // listen to hide event
        this.$root.$on('hide-paintable-navigation', hidePaintable => {
          this.hidePaintable = hidePaintable;
        });
      } catch (err) {
        // this.hide = true;
        // this.hidePaintable = true;
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
     * Change current drawing color
     */
    changeColor(color) {
      this.currentColor = color;
      this.tempCtx.strokeStyle = this.currentColor;
      this.ctx.strokeStyle = this.currentColor;
    },
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
        };
        image.src = base64Image;
      }
    },
    /**
     * Set current canvas size
     */
    setCanvasSize() {
      // this.width = window.innerWidth;
      // this.height = window.innerHeight;
      this.currentX = 0;
      this.currentY = 0;
    },
    /**
     * Clear complete canvas
     */
    clearCanvas() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    },
    /**
     * Cancel current drawing and remove lines
     */
    cancelDrawing() {
      this.loadImageFromStorage();
      this.isActive = false;
    },
    isCanvasBlank() {
      const blank = document.createElement('canvas');

      blank.width = this.height;
      blank.height = this.width;

      return this.canvas.toDataURL() == blank.toDataURL();
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
            width: this.width,
            height: this.height
          })
        );
      }
      this.undoList = [];
      this.redoList = [];
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

        this.saveCurrentCanvasState(this.canvas);

        this.previousX = this.currentX;
        this.previousY = this.currentY;

        // this.currentX =
        //   e.targetTouches[0].clientX * this.scalingFactor -
        //   this.tempCanvas.getBoundingClientRect().left;
        // this.currentY =
        //   e.targetTouches[0].clientY * this.scalingFactor -
        //   this.tempCanvas.getBoundingClientRect().top;
        this.currentX = e.targetTouches[0].clientX - this.tempCanvas.getBoundingClientRect().left;
        this.currentY = e.targetTouches[0].clientY - this.tempCanvas.getBoundingClientRect().top;

        this.pointCoords.push({
          x: this.currentX,
          y: this.currentY
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

        this.pointCoords = [];
      }
    },
    /**
     * Generate line from points array
     */
    drawLine(context) {
      this.tempCtx.clearRect(0, 0, this.width, this.height);

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

      if (this.isActive) {
        this.previousX = this.currentX;
        this.previousY = this.currentY;

        // this.currentX =
        //   e.targetTouches[0].clientX * this.scalingFactor -
        //   this.tempCanvas.getBoundingClientRect().left;
        // this.currentY =
        //   e.targetTouches[0].clientY * this.scalingFactor -
        //   this.tempCanvas.getBoundingClientRect().top;
        this.currentX = e.targetTouches[0].clientX - this.tempCanvas.getBoundingClientRect().left;
        this.currentY = e.targetTouches[0].clientY - this.tempCanvas.getBoundingClientRect().top;

        this.pointCoords.push({
          x: this.currentX,
          y: this.currentY
        });

        this.drawLine(!this.isEraserActive ? this.tempCtx : this.ctx);
      }
    }
  }
};
</script>
<style>
</style>

<style lang="scss" scoped>
.paintable {
  overflow: hidden;
  position: fixed;
  height: 100%;
  width: 100%;
  &.active {
    z-index: 0;
  }

  .linewidth {
    position: relative;
    &__picker {
      background: #4bb6e5;
      position: absolute;
      left: -225px;
      top: 0;
      padding: 12px;
      border-radius: 5px;
      box-sizing: border-box;
      &Color {
        border-radius: 100%;
        height: 15px;
        width: 15px;
        display: block;
        margin: 0 0 10px;
        border: 2px solid transparent;
        &:last-child {
          margin: 0;
        }
        &.selected {
          border: 2px solid #fff;
        }
      }
    }
  }

  .color {
    position: relative;
    &__picker {
      background: #4bb6e5;
      position: absolute;
      left: -60px;
      top: 0;
      padding: 12px;
      border-radius: 5px;
      &Color {
        border-radius: 100%;
        height: 15px;
        width: 15px;
        display: block;
        margin: 0 0 10px;
        border: 2px solid transparent;
        &:last-child {
          margin: 0;
        }
        &.selected {
          border: 2px solid #fff;
        }
      }
    }
  }

  &LineWidth {
    border-radius: 100%;
  }

  .navigation {
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 1005;
    background-color: #6b6b6b;
    border-radius: 10px;
    padding: 10px 10px 0;
    .navigationBtn {
      padding: 7px 8px;
      border-radius: 5px;
      display: block;
      cursor: pointer;
      border: 0;
      margin: 0 0 10px;
      background-color: #4bb5e4;
      color: #fff;
      width: 60px;
      box-sizing: border-box;
      text-align: center;
      &.disabled {
        opacity: 0.5;
      }
      &--save {
        background-color: #4bb5e4;
      }
      &--undo, &--linewidth {
        margin-top: 10px;
      }
      &--clear {
        margin-top: 10px;
        background-color: #dc6363;
      }
      &--eraser {
        background-color: #dc6363;
      }
    }
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
