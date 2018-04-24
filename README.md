# vue-paintable-screen

![https://www.npmjs.com/package/@appcominteractive/vue-paintable-screen](https://img.shields.io/npm/v/@appcominteractive/vue-paintable-screen.svg)

With this vue component you can add a paintable canvas through every page you like.
All paintings are saved into the local storage.

### How to use?

```bash
npm install @appcominteractive/vue-paintable-screen --save
```

```javascript
import Vue from 'vue';
import PaintablePlugin from '@appcominteractive/vue-paintable-screen';

Vue.use(PaintablePlugin);
//...
```

**later in your components**

```html
<template>
    <paintable-screen
        name="my-screen"
        :showUndoRedo="false"
        :showLineWidth="false"
        :lineWidth="10"
        :colors="['red', '#000']"
        :hide="false">
        <router-view></router-view>
    </paintable-screen>
</template>
```

### Props

* name | string - required
* showUndoRedo | boolean
* hide | boolean
* colors | Array of colors (rgb, hex etc.)
* width | number
* height | number
* showLineWidth | boolean
* lineWidth | number

### Global methods

* $hidePaintableNavigation | void
  * Hide paintable navigation
* $showPaintableNavigation | void
  * Show paintable navigation

### Events

* toggle-paintable-screen | boolean
  * Is emitted, when changing paintable state
