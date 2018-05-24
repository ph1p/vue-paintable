<template>
    <div class="navigation" v-if="!paintabelView.hidePaintableNavigation">

        <div class="navigation__colorPicker" v-if="isColorPickerOpen">
            <span :class="['navigation__colorPickerColor', {selected: paintabelView.currentColor === color}]" v-for="color in paintabelView.colors" :key="color" :style="{backgroundColor: color}" @click="changeColor(color)"></span>
        </div>

        <div class="navigation__lineWidthPicker" v-if="isLineWidthPickerOpen">
            <label for="navigation__lineWidthPickerRange">({{paintabelView.currentLineWidth}}px):</label>
            <input id="navigation__lineWidthPickerRange" type="range" min="1" max="100" v-model="paintabelView.currentLineWidth" @change="isLineWidthPickerOpen = false">
            <div class="navigation__lineWidthPickerDot" :style="lineWidthStyle"></div>
        </div>

        <ul class="navigationMenu" :class="{'active': paintabelView.isActive}">
            <li :class="'navigationMenu__'+item.name" v-for="item in navigation" :key="item.name">
                <div @click="item.click" v-html="item.isActive ? item.activeBody : item.body"></div>
                <ul v-if="paintabelView.isActive">
                    <li v-if="item.show" v-for="item in item.subNavigation" :key="item.name" :class="['navigationMenu__'+item.name, {disabled: item.disabled}]">
                        <div @click="item.click" v-html="item.isActive ? item.activeBody : item.body"></div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'paintable-navigation',
  data() {
    return {
      isColorPickerOpen: false,
      isLineWidthPickerOpen: false,
      paintabelView: this.$parent
    };
  },
  computed: {
    navigation() {
      return [
        {
          name: 'draw-save',
          body: 'draw',
          activeBody: 'save',
          isActive: this.paintabelView.isActive,
          click: this.togglePainting,
          subNavigation: [
            {
              name: 'color',
              body: 'color',
              disabled: false,
              show: this.paintabelView.colors.length > 0,
              click: this.openColorPicker
            },
            {
              name: 'line-width',
              body: 'line-width',
              disabled: false,
              show: this.paintabelView.showLineWidth,
              click: this.openLineWidthPicker
            },
            {
              name: 'undo',
              body: 'undo',
              disabled: !this.paintabelView.undoList.length,
              show: this.paintabelView.showUndoRedo,
              click: this.paintabelView.undoDrawingStep
            },
            {
              name: 'redo',
              body: 'redo',
              disabled: !this.paintabelView.redoList.length,
              show: this.paintabelView.showUndoRedo,
              click: this.paintabelView.redoDrawingStep
            },
            {
              name: 'delete',
              body: 'delete',
              disabled: false,
              show: true,
              click: this.paintabelView.clearCanvas
            },
            {
              name: 'eraser-pencil',
              body: 'eraser',
              activeBody: 'pencil',
              isActive: this.paintabelView.isEraserActive,
              disabled: false,
              show: true,
              click: this.toggleEraserAndPencil
            },
            {
              name: 'cancel',
              body: 'cancel',
              disabled: false,
              show: true,
              click: this.cancelDrawing
            }
          ]
        }
      ].map(navigationItem => {
        if (this.paintabelView.navigation && this.paintabelView.navigation[navigationItem.name]) {
          return Object.assign({}, navigationItem, this.paintabelView.navigation[navigationItem.name]);
        }

        if (navigationItem.subNavigation && navigationItem.subNavigation.length > 0) {
            navigationItem.subNavigation = navigationItem.subNavigation.map(subNavigationItem => {
                if (this.paintabelView.navigation && this.paintabelView.navigation[subNavigationItem.name]) {
                    return Object.assign({}, subNavigationItem, this.paintabelView.navigation[subNavigationItem.name]);
                }
                return subNavigationItem;
            });
        }

        return navigationItem;
      });
    },
    lineWidthStyle() {
      return {
        height: this.paintabelView.currentLineWidth + 'px',
        width: this.paintabelView.currentLineWidth + 'px',
        backgroundColor: this.paintabelView.currentColor
      };
    }
  },
  methods: {
    toggleEraserAndPencil() {
      this.paintabelView.isEraserActive = !this.paintabelView.isEraserActive;
    },
    openColorPicker() {
      this.isColorPickerOpen = !this.isColorPickerOpen;
      this.isLineWidthPickerOpen = false;
    },
    openLineWidthPicker() {
      this.isLineWidthPickerOpen = !this.isLineWidthPickerOpen;
      this.isColorPickerOpen = false;
    },
    /**
     * Cancel current drawing and remove lines
     */
    cancelDrawing() {
      this.paintabelView.loadImageFromStorage();
      this.paintabelView.isActive = false;
      this.isColorPickerOpen = false;
      this.isLineWidthPickerOpen = false;
    },
    /**
     * Change current drawing color
     */
    changeColor(color) {
      this.paintabelView.currentColor = color;
      this.paintabelView.tempCtx.strokeStyle = this.paintabelView.currentColor;
      this.paintabelView.ctx.strokeStyle = this.paintabelView.currentColor;

      this.isColorPickerOpen = false;
    },
    /**
     * Toggle painting
     */
    togglePainting() {
      if (this.paintabelView.isActive) {
        this.paintabelView.saveCurrentCanvasToStorage();
      }
      this.paintabelView.isActive = !this.paintabelView.isActive;
      this.isColorPickerOpen = false;
      this.isLineWidthPickerOpen = false;

      // emit root event
      this.$root.$emit('toggle-paintable', this.paintabelView.isActive);
      // deprecated
      this.$root.$emit('toggle-paintable-screen', this.paintabelView.isActive);
    }
  }
};
</script>

<style lang="scss" scoped>
.navigation {
  position: fixed;
  right: 20px;
  top: 20px;
  z-index: 1005;
  background-color: #333333;
  border-radius: 5px;
  color: #fff;

  .navigationMenu {
    list-style: none;
    padding: 0;
    margin: 0;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    li {
      & > div {
        cursor: pointer;
        padding: 12px;
      }
      &.disabled {
        opacity: 0.5;
      }
    }
  }

  &__lineWidthPicker {
    background: #333333;
    position: absolute;
    left: -225px;
    top: 0;
    padding: 12px;
    border-radius: 5px;
    box-sizing: border-box;
    &Dot {
        margin-top: 10px;
        border-radius: 100%;
    }
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

  &__colorPicker {
    background: #333333;
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
</style>
