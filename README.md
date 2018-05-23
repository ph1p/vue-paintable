# vue-paintable [![npm](https://img.shields.io/npm/v/vue-paintable.svg)](https://www.npmjs.com/package/vue-paintable) [![Build Status](https://travis-ci.org/ph1p/vue-paintable.svg?branch=master)](https://travis-ci.org/ph1p/vue-paintable)

With this vue plugin and component you can add a paintable canvas through your page.
All paintings are saved by default into localStorage, but you can change that if you like.

### How to use?

```bash
npm install vue-paintable --save
```

```javascript
import Vue from 'vue';
import PaintablePlugin from 'vue-paintable';

Vue.use(Paintable, {
  // optional methods
  setItem(key, value) {
    localStorage.setItem(key, value);
  },
  async getItem(key) {
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
    <paintable-screen
        name="my-screen"
        useMouse
        :showUndoRedo="false"
        :showLineWidth="false"
        :lineWidth="10"
        :colors="['red', '#000']"
        :hide="false">
        Your content
        <router-view></router-view>
    </paintable-screen>
</template>
```

### Props

| name          | type                            | required | default                                                                  | description                                                                                                               |
| ------------- | ------------------------------- | -------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| useMouse      | boolean                         | false    | false                                                                    | use mouse events instead of touch events                                                                                  |
| name          | string - required               | true     | -                                                                        | unique identifier                                                                                                         |
| showUndoRedo  | boolean                         | false    | true                                                                     | show undo and redo button                                                                                                 |
| hide          | boolean                         | false    | false                                                                    | hide the complete paintable                                                                                               |
| colors        | Array of colors (rgb, hex etc.) | false    | ['black', '#f00', '#4481c7', 'rgba(255, 235, 59, 0.4)', '#999', 'green'] | array of choosable colors                                                                                                 |
| width         | number                          | false    | window.innerWidth                                                        | canvas width                                                                                                              |
| height        | number                          | false    | window.innerHeight                                                       | canvas height                                                                                                             |
| showLineWidth | boolean                         | false    | true                                                                     | show button to set line width                                                                                             |
| lineWidth     | number                          | false    | 5                                                                        | line width                                                                                                                |
| alwaysOnTop   | boolean                         | false    | false                                                                    | Set canvas always as top layer. Caution! Don't this, if you've elements like links, buttons or input fields on your page. |


### Global methods

| name                     | type | description               |
| ------------------------ | ---- | ------------------------- |
| $hidePaintableNavigation | void | Hide paintable navigation |
| $showPaintableNavigation | void | Show paintable navigation |

```javascript
mounted() {
    this.$hidePaintableNavigation();
}
```


### Events

| name                    | type    | description                               |
| ----------------------- | ------- | ----------------------------------------- |
| toggle-paintable-screen | boolean | Is emitted, when changing paintable state |

```javascript
this.$root.$on('toggle-paintable-screen', isActive => {
  console.log(isActive);
});
```


### development

If you want to develop on this plugin follow these steps:

- clone repo
- run `npm install`
- run `npm run dev`