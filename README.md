# vue-paintable-screen

![https://www.npmjs.com/package/@appcominteractive/vue-paintable-screen](https://img.shields.io/npm/v/@appcominteractive/vue-paintable-screen.svg)

With this vue plugin and component you can add a paintable canvas through your page.
All paintings are saved by default into localStorage, but you can change that if you like.

### How to use?

```bash
npm install @appcominteractive/vue-paintable-screen --save
```

```javascript
import Vue from 'vue';
import PaintablePlugin from '@appcominteractive/vue-paintable-screen';

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
        :useMouse="true"
        :showUndoRedo="false"
        :showLineWidth="false"
        :lineWidth="10"
        :colors="['red', '#000']"
        :colors="['red', '#000']"
        :hide="false">
        Your content
        <router-view></router-view>
    </paintable-screen>
</template>
```

### Props
ƒ
| name          | type                            | required | default                                                                  |
| ------------- | ------------------------------- | -------- | ------------------------------------------------------------------------ |
| useMouse      | boolean                         | false    | false                                                                    |
| name          | string - required               | true     | -                                                                        |
| showUndoRedo  | boolean                         | false    | true                                                                     |
| hide          | boolean                         | false    | false                                                                    |
| colors        | Array of colors (rgb, hex etc.) | false    | ['black', '#f00', '#4481c7', 'rgba(255, 235, 59, 0.4)', '#999', 'green'] |
| width         | number                          | false    | window.innerWidth                                                        |
| height        | number                          | false    | window.innerHeight                                                       |
| showLineWidth | boolean                         | false    | true                                                                     |
| lineWidth     | number                          | false    | 5                                                                        |


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