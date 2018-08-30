# vue-paintable [![npm](https://badge.fury.io/js/vue-paintable.svg)](https://www.npmjs.com/package/vue-paintable) [![Build Status](https://travis-ci.org/ph1p/vue-paintable.svg?branch=master)](https://travis-ci.org/ph1p/vue-paintable) [![Demo](https://img.shields.io/badge/glitch-demo-fe6a73.svg)](https://vue-paintable-demo.glitch.me)

With this vue plugin and component you can add a paintable canvas through your page.
All paintings are saved by default into localStorage.

### How to use?

```bash
npm install vue-paintable --save
```

```javascript
import Vue from 'vue';
import Paintable from 'vue-paintable';

Vue.use(Paintable, {
  // optional methods
  setItem(key, image) {
    localStorage.setItem(key, image);
  },
  // you also can use async
  getItem(key) {
    return localStorage.getItem(key);
  },
  removeItem(key) {
    localStorage.removeItem(key);
  }
});
//...
```

**later in your components**

```html
<template>
    <paintable
        name="my-screen"
        useMouse
        displayHorizontal
        :showUndoRedo="false"
        :showLineWidth="false"
        :lineWidth="10"
        :colors="['red', '#000', 'rgba(255,0,0,0.5)']"
        :lineWidthEraser="20"
        :navigation="{
          'draw-save': {
            body: 'draw',
            activeBody: '<strong>save</strong>'
          },
          color: {
            body: 'CP'
          }
        }"
        :hide="false">
        Your content
        <router-view></router-view>
    </paintable>
</template>
```

### Navigation

Set your own navigation content by adding an object to your `<paintable>` component.

```javascript
{
  'draw-save': {
    body: 'draw',
    activeBody: '<strong>save</strong>'
  },
  color: {
    body: 'CP'
  }
}
```

**Display navigation horizontal**

To display the navigation horizontally add `displayHorizontal` to prop list.

**Available navigation items:**

- color
- line-width
- undo
- redo
- delete
- cancel

**has active state (activeBody):**

- draw-save
- eraser-pencil

### Props

| name              | type                            | required | default                                                                  | description                                                                                                               |
| ----------------- | ------------------------------- | -------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| useMouse          | boolean                         | false    | false                                                                    | use mouse events instead of touch events                                                                                  |
| name              | string - required               | true     | -                                                                        | unique identifier                                                                                                         |
| showUndoRedo      | boolean                         | false    | true                                                                     | show undo and redo button                                                                                                 |
| hide              | boolean                         | false    | false                                                                    | hide the complete paintable                                                                                               |
| colors            | Array of colors (rgb, hex etc.) | false    | ['black', '#f00', '#4481c7', 'rgba(255, 235, 59, 0.4)', '#999', 'green'] | array of choosable colors                                                                                                 |
| width             | number                          | false    | window.innerWidth                                                        | canvas width                                                                                                              |
| height            | number                          | false    | window.innerHeight                                                       | canvas height                                                                                                             |
| showLineWidth     | boolean                         | false    | true                                                                     | show button to set line width                                                                                             |
| lineWidth         | number                          | false    | 5                                                                        | line width                                                                                                                |
| alwaysOnTop       | boolean                         | false    | false                                                                    | set canvas always as top layer. Caution! Don't this, if you've elements like links, buttons or input fields on your page. |
| factor            | number                          | false    | 1                                                                        | set a scale factor if needed                                                                                              |
| lineWidthEraser   | number                          | false    | 20                                                                       | set eraser line width                                                                                                     |
| displayHorizontal | boolean                         | false    | false                                                                    | display the navigation horizontally                                                                                       |

### Global methods

| name                     | type | description               |
| ------------------------ | ---- | ------------------------- |
| $hidePaintableNavigation | void | Hide paintable navigation | @ |
| $showPaintableNavigation | void | Show paintable navigation |

```javascript
mounted() {
    this.$hidePaintableNavigation();
}
```

### Events

| name             | type    | description                               |
| ---------------- | ------- | ----------------------------------------- |
| toggle-paintable | boolean | Is emitted, when changing paintable state |

```javascript
this.$root.$on('toggle-paintable', isActive => {
  console.log(isActive);
});
```

### development

If you want to develop on this plugin follow these steps:

- clone repo
- run `npm install`
- run `npm run dev`
