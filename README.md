# vue-paintable-screen

With this vue component you can add a paintable canvas through every page you like.
All paintings are saved into the local storage.


### How to use?

```javascript
import Vue from 'vue';
import PaintablePlugin from '@appcominteractive/vue-paintable-screen';

Vue.use(PaintablePlugin);
//...
```

**later in your components**

```html
<template>
    <paintable-screen name="my-screen" :undoRedo="false" :hide="false">
        <router-view></router-view>
    </paintable-screen>
</template>
```

### Props

* name | string - required
* undoRedo | boolean
* hide | boolean
* colors | Array of colors (rgb, hex etc.)
* width | number
* height | number

### Global methods

* $hidePaintableNavigation | void
    * Hide paintable navigation
* $showPaintableNavigation | void
    * Show paintable navigation


### Events

* toggle-paintable-screen | boolean
    * Is emitted, when changing paintable state