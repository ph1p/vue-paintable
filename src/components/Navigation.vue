<template>
  <div
    class="navigation"
    :class="{ navigation__horizontalNavigation: horizontalNavigation }"
    v-if="!paintableView.hidePaintableNavigation"
  >
    <div class="navigation__colorPicker" v-if="isColorPickerOpen">
      <span
        :class="[
          'navigation__colorPickerColor',
          { selected: paintableView.currentColor === color }
        ]"
        v-for="color in paintableView.colors"
        :key="color"
        :style="{ backgroundColor: color }"
        @click="changeColor(color)"
      ></span>
    </div>

    <div class="navigation__lineWidthPicker" v-if="isLineWidthPickerOpen">
      <label for="navigation__lineWidthPickerRange"
        >({{ paintableView.currentLineWidth }}px):</label
      ><br />
      <input
        id="navigation__lineWidthPickerRange"
        type="range"
        min="1"
        max="100"
        v-model="paintableView.currentLineWidth"
        @change="isLineWidthPickerOpen = false"
      />
      <div class="navigation__lineWidthPickerDot" :style="lineWidthStyle"></div>
    </div>

    <ul class="navigationMenu" :class="{ active: paintableView.isActive }">
      <li
        :class="'navigationMenu__' + item.name"
        v-for="item in horizontalNavigation ? navigation.reverse() : navigation"
        :key="item.name"
      >
        <div
          v-if="!horizontalNavigation"
          @click="item.click"
          v-html="item.isActive ? item.activeBody : item.body"
        ></div>
        <ul v-if="paintableView.isActive">
          <li
            v-for="item in item.subNavigation"
            :key="item.name"
            :class="[
              'navigationMenu__' + item.name,
              { disabled: item.disabled }
            ]"
          >
            <div
              @click="item.click"
              v-html="item.isActive ? item.activeBody : item.body"
            ></div>
          </li>
        </ul>
        <div
          v-if="horizontalNavigation"
          @click="item.click"
          v-html="item.isActive ? item.activeBody : item.body"
        ></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'paintable-navigation',
  props: ['horizontalNavigation'],
  data() {
    return {
      isColorPickerOpen: false,
      isLineWidthPickerOpen: false,
      paintableView: this.$parent
    };
  },
  computed: {
    navigation() {
      return this.filteredNavigation.map(navigationItem => {
        if (
          navigationItem.subNavigation &&
          navigationItem.subNavigation.length > 0
        ) {
          const navigationItemSubNavigation = this.horizontalNavigation
            ? navigationItem.subNavigation.reverse()
            : navigationItem.subNavigation;
          navigationItem.subNavigation = navigationItemSubNavigation.map(
            subNavigationItem => {
              if (
                this.paintableView.navigation &&
                this.paintableView.navigation[subNavigationItem.name]
              ) {
                return Object.assign(
                  {},
                  subNavigationItem,
                  this.paintableView.navigation[subNavigationItem.name]
                );
              }
              return subNavigationItem;
            }
          );
        }

        if (
          this.paintableView.navigation &&
          this.paintableView.navigation[navigationItem.name]
        ) {
          return Object.assign(
            {},
            navigationItem,
            this.paintableView.navigation[navigationItem.name]
          );
        }

        return navigationItem;
      });
    },
    filteredNavigation() {
      return [
        {
          name: 'draw-save',
          body: 'draw',
          activeBody: 'save',
          isActive: this.paintableView.isActive,
          click: this.togglePainting,
          subNavigation: [
            {
              name: 'color',
              body: 'color',
              disabled: false,
              show: this.paintableView.colors.length > 0,
              click: this.openColorPicker
            },
            {
              name: 'line-width',
              body: 'line-width',
              disabled: false,
              show: this.paintableView.showLineWidth,
              click: this.openLineWidthPicker
            },
            {
              name: 'undo',
              body: 'undo',
              disabled: !this.paintableView.undoList.length,
              show: this.paintableView.showUndoRedo,
              click: this.paintableView.undoDrawingStep
            },
            {
              name: 'redo',
              body: 'redo',
              disabled: !this.paintableView.redoList.length,
              show: this.paintableView.showUndoRedo,
              click: this.paintableView.redoDrawingStep
            },
            {
              name: 'delete',
              body: 'delete',
              disabled: false,
              show: true,
              click: this.paintableView.clearCanvas
            },
            {
              name: 'eraser-pencil',
              body: 'eraser',
              activeBody: 'pencil',
              isActive: this.paintableView.isEraserActive,
              disabled: false,
              show: true,
              click: this.toggleEraserAndPencil
            },
            {
              name: 'cancel',
              body: 'cancel',
              disabled: false,
              show: true,
              click: this.paintableView.cancelDrawing
            }
          ].filter(item => item.show)
        }
      ];
    },
    lineWidthStyle() {
      return {
        height: this.paintableView.currentLineWidth + 'px',
        width: this.paintableView.currentLineWidth + 'px',
        backgroundColor: this.paintableView.currentColor
      };
    }
  },
  methods: {
    toggleEraserAndPencil() {
      this.paintableView.isEraserActive = !this.paintableView.isEraserActive;
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
     * Change current drawing color
     */
    changeColor(color) {
      this.paintableView.currentColor = color;
      this.paintableView.tempCtx.strokeStyle = this.paintableView.currentColor;
      this.paintableView.ctx.strokeStyle = this.paintableView.currentColor;

      this.isColorPickerOpen = false;
    },
    /**
     * Toggle painting
     */
    togglePainting() {
      if (this.paintableView.isActive) {
        this.paintableView.saveCurrentCanvasToStorage();
      }

      this.paintableView.isActive = !this.paintableView.isActive;
      this.isColorPickerOpen = false;
      this.isLineWidthPickerOpen = false;

      this.$parent.$emit('toggle-paintable', this.paintableView.isActive);
    }
  }
};
</script>

<style scoped>
.navigation {
  position: fixed;
  right: 20px;
  top: 20px;
  z-index: 1005;
  background-color: #333;
  border-radius: 5px;
  color: #fff;
}
.navigation .navigationMenu {
  list-style: none;
  padding: 0;
  margin: 0;
}
.navigation .navigationMenu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.navigation .navigationMenu li > div {
  cursor: pointer;
  padding: 12px;
}
.navigation .navigationMenu li.disabled {
  opacity: 0.5;
}
.navigation__lineWidthPicker {
  background: #333;
  position: absolute;
  left: -225px;
  top: 0;
  padding: 12px;
  border-radius: 5px;
  box-sizing: border-box;
}
.navigation__lineWidthPickerDot {
  margin-top: 10px;
  border-radius: 100%;
}
.navigation__lineWidthPickerColor {
  border-radius: 100%;
  height: 15px;
  width: 15px;
  display: block;
  margin: 0 0 10px;
  border: 2px solid transparent;
}
.navigation__lineWidthPickerColor:last-child {
  margin: 0;
}
.navigation__lineWidthPickerColor.selected {
  border: 2px solid #fff;
}
.navigation__colorPicker {
  background: #333;
  position: absolute;
  left: -60px;
  top: 0;
  padding: 12px;
  border-radius: 5px;
}
.navigation__colorPickerColor {
  border-radius: 100%;
  height: 15px;
  width: 15px;
  display: block;
  margin: 0 0 10px;
  border: 2px solid transparent;
}
.navigation__colorPickerColor:last-child {
  margin: 0;
}
.navigation__colorPickerColor.selected {
  border: 2px solid #fff;
}
.navigation__horizontalNavigation .navigationMenu ul {
  display: inline-flex;
}
.navigation__horizontalNavigation .navigationMenu li {
  display: inline-flex;
}
</style>
