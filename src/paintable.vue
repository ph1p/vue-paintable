<template>
    <div class="paintable" v-if="!hide && !hidePaintable">
        <div class="navigation">
          <span  v-if="isActive">
            <span class="color" v-if="colors.length > 0">
              <div class="navigationBtn" @click="isColorPickerOpen = !isColorPickerOpen">
                color
              </div>
              <div class="color__picker" v-if="isColorPickerOpen">
                <span :class="['color__pickerColor', {selected: currentColor === color}]" v-for="color in colors" :key="color" :style="{backgroundColor: color}" @click="changeColor(color); isColorPickerOpen = false;"></span>
              </div>
            </span>
            <span class="linewidth">
              <div class="navigationBtn" @click="isLineWidthPickerOpen = !isLineWidthPickerOpen">
                font-size
              </div>
              <div class="linewidth__picker" v-if="isLineWidthPickerOpen">
                <label for="linewidth__picker">Font-Size ({{lineWidth}}px):</label>
                <input id="paintable-font-size" type="range" min="1" max="100" v-model="lineWidth" @change="isLineWidthPickerOpen = false">
                <div class="paintableLineWidth" :style="{height: lineWidth + 'px', width: lineWidth + 'px', backgroundColor: this.currentColor}"></div>
              </div>
            </span>

            <span v-if="undoRedo">
              <div class="navigationBtn" @click="undoDrawingStep" :class="{disabled: !undoList.length}">undo</div>
              <div class="navigationBtn" @click="redoDrawingStep" :class="{disabled: !redoList.length}">redo</div>
            </span>

            <div class="navigationBtn clear" @click="clearCanvas">delete</div>
            <div class="navigationBtn eraser" @click="isEraserActive = !isEraserActive">
                <span v-if="!isEraserActive">eraser</span>
                <span v-else>pencil</span>
            </div>
            <div class="navigationBtn" @click="cancelDrawing">cancel</div>
          </span>
          <div class="navigationBtn save" @click="togglePainting">
              <span v-if="isActive" @click="saveCurrentCanvasToStorage">save</span>
              <span v-else>draw</span>
          </div>
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

        <div class="content">
            <slot></slot>
        </div>
    </div>
    <div v-else class="content">
        <slot></slot>
    </div>
</template>

<script>
/**
 * Copyright (C) 2018 Philip Stapelfeldt (p.stapelfeldt@appcom-interactive.de)
 * appcom interactive GmbH
 */

// Variables
let previousX = 0;
let previousY = 0;

let currentX = 0;
let currentY = 0;

let tempCanvas = null;
let tempCtx = null;

let canvas = null;
let ctx = null;

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
    undoRedo: {
      type: Boolean,
      default: true
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
      lineWidth: 10,
      isEraserActive: false,
      isActive: false,
      pointCoords: [],
      redoList: [],
      undoList: [],
      isColorPickerOpen: false,
      isLineWidthPickerOpen: false
    };
  },
  watch: {
    name() {
      this.loadImageFromStorage();
    },
    lineWidth(lineWidth) {
      ctx.lineWidth = lineWidth;
      tempCtx.lineWidth = lineWidth;
    },
    color(color) {
      ctx.strokeStyle = color;
      tempCtx.strokeStyle = color;
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
    togglePainting() {
      this.isActive = !this.isActive;

      // emit root event
      this.$root.$emit('toggle-paintable-screen', this.isActive);
    },
    /**
     * Init paintable component and set all variables
     */
    init() {
      // temporary canvas
      tempCanvas = document.getElementById('temp-canvas-' + this.canvasId);
      tempCtx = tempCanvas.getContext('2d');

      // canvas with drawing
      canvas = document.getElementById('canvas-' + this.canvasId);
      ctx = canvas.getContext('2d');

      tempCtx.lineCap = 'round';
      ctx.lineCap = 'round';

      tempCtx.lineWidth = this.lineWidth;
      ctx.lineWidth = this.lineWidth;

      tempCtx.strokeStyle = this.currentColor;
      ctx.strokeStyle = this.currentColor;

      localStorage.setItem(
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
      ctx.globalCompositeOperation = 'source-over';
      if (pop.length) {
        const restore_state = pop.pop();
        this.saveCurrentCanvasState(canvas, push, true);
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
      tempCtx.strokeStyle = this.currentColor;
      ctx.strokeStyle = this.currentColor;
    },
    /**
     * Get base64 from local storage and load it into canvas
     */
    loadImageFromStorage(image) {
      this.clearCanvas();

      const base64Image = image || localStorage.getItem(this.name);
      if (base64Image) {
        let image = new Image();
        image.onload = () => {
          ctx.drawImage(image, 0, 0);
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
      currentX = 0;
      currentY = 0;
    },
    /**
     * Clear complete canvas
     */
    clearCanvas() {
      ctx.clearRect(0, 0, this.width, this.height);
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

      return canvas.toDataURL() == blank.toDataURL();
    },
    /**
     * Check first, if canvas is empty.
     * If its not empty save it to the storage.
     */
    saveCurrentCanvasToStorage() {
      if (this.isCanvasBlank()) {
        localStorage.removeItem(this.name);
        localStorage.removeItem(this.name + '-settings');
      } else {
        localStorage.setItem(this.name, canvas.toDataURL('image/png'));
        localStorage.setItem(
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

        this.saveCurrentCanvasState(canvas);

        previousX = currentX;
        previousY = currentY;

        // currentX =
        //   e.targetTouches[0].clientX * this.scalingFactor -
        //   tempCanvas.getBoundingClientRect().left;
        // currentY =
        //   e.targetTouches[0].clientY * this.scalingFactor -
        //   tempCanvas.getBoundingClientRect().top;
        currentX = e.targetTouches[0].clientX - tempCanvas.getBoundingClientRect().left;
        currentY = e.targetTouches[0].clientY - tempCanvas.getBoundingClientRect().top;

        this.pointCoords.push({
          x: currentX,
          y: currentY
        });

        tempCtx.globalCompositeOperation = 'source-over';
        ctx.globalCompositeOperation = this.isEraserActive ? 'destination-out' : 'source-over';
      }
    },
    /**
     * End of drawing a line
     */
    drawEnd(e) {
      if (this.isActive) {
        this.drawLine(ctx);

        this.pointCoords = [];
      }
    },
    /**
     * Generate line from points array
     */
    drawLine(context) {
      tempCtx.clearRect(0, 0, this.width, this.height);

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
        previousX = currentX;
        previousY = currentY;

        // currentX =
        //   e.targetTouches[0].clientX * this.scalingFactor -
        //   tempCanvas.getBoundingClientRect().left;
        // currentY =
        //   e.targetTouches[0].clientY * this.scalingFactor -
        //   tempCanvas.getBoundingClientRect().top;
        currentX = e.targetTouches[0].clientX - tempCanvas.getBoundingClientRect().left;
        currentY = e.targetTouches[0].clientY - tempCanvas.getBoundingClientRect().top;

        this.pointCoords.push({
          x: currentX,
          y: currentY
        });

        this.drawLine(!this.isEraserActive ? tempCtx : ctx);
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
      left: 10px;
      top: 35px;
      padding: 10px 16px 17px 17px;
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

  .color {
    position: relative;
    &__picker {
      background: #4bb6e5;
      position: absolute;
      left: 10px;
      top: 35px;
      padding: 10px 16px 17px 17px;
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
  &FontSize,
  &EraserSize {
    input[type='range'] {
      -webkit-appearance: none;
      width: 100%;
      margin: 0.7px 0;
    }
    input[type='range']:focus {
      outline: none;
    }
    input[type='range']::-webkit-slider-runnable-track {
      width: 100%;
      height: 10px;
      cursor: pointer;
      background: #ddd;
      border-radius: 4px;
    }
    input[type='range']::-webkit-slider-thumb {
      height: 30px;
      width: 30px;
      border-radius: 100%;
      background: #3b7dbb;
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -5px;
    }
    input[type='range']:focus::-webkit-slider-runnable-track {
      background: #545a5a;
    }
    input[type='range']:focus::-ms-fill-lower {
      background: #484d4d;
    }
    input[type='range']:focus::-ms-fill-upper {
      background: #545a5a;
    }
  }

  .navigation {
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 1005;
    .navigationBtn {
      padding: 10px 20px;
      border-radius: 5px;
      display: inline-block;
      cursor: pointer;
      border: 0;
      margin-left: 10px;
      background-color: #4bb5e4;
      color: #fff;

      &.disabled {
        opacity: 0.5;
      }
      &.save {
        background-color: #4bb5e4;
      }
      &.clear {
        background-color: #dc6363;
      }
      &.eraser {
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
