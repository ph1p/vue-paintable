(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["paintable"] = factory();
	else
		root["paintable"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "24fb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "4226":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Paintable_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4839");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Paintable_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Paintable_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "4839":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("4979");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("3368f113", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "4979":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".paintable,body{position:fixed}.paintable{overflow:hidden;height:100%;width:100%;-webkit-transform:scale(1);transform:scale(1)}.paintable.active{z-index:0}.paintable .canvas{position:relative;background-color:transparent;z-index:-1;position:absolute;left:0;top:0;overflow:hidden;-ms-touch-action:none;touch-action:none}.paintable .canvas.active{z-index:1000}.paintable .canvas.active.back{z-index:999}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "499e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ addStylesClient; });

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesClient.js
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1ca830e2-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Paintable.vue?vue&type=template&id=66ad717a&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (!_vm.hide)?_c('div',{staticClass:"paintable"},[_c('canvas',{ref:'canvas-' + _vm.canvasId,staticClass:"canvas back",class:{ active: _vm.isActive || _vm.alwaysOnTop },style:({
      pointerEvents: !_vm.isActive ? 'none' : 'all',
      display: !_vm.canvasIsEmpty || _vm.isActive ? 'block' : 'none'
    }),attrs:{"width":_vm.width,"height":_vm.height}}),_c('canvas',{ref:'temp-canvas-' + _vm.canvasId,staticClass:"canvas",class:{ active: _vm.isActive || _vm.alwaysOnTop },style:({
      pointerEvents: !_vm.isActive ? 'none' : 'all',
      display: !_vm.canvasIsEmpty || _vm.isActive ? 'block' : 'none'
    }),attrs:{"width":_vm.width,"height":_vm.height},on:_vm._d({},[_vm.drawMoveEvent,_vm.drawMove,_vm.drawStartEvent,_vm.drawStart,_vm.drawEndEvent,_vm.drawEnd])}),_c('div',{staticClass:"content"},[_vm._t("default")],2)]):_c('div',{staticClass:"content"},[_vm._t("default")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/Paintable.vue?vue&type=template&id=66ad717a&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Paintable.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
let currentX = 0;
let currentY = 0;
/* harmony default export */ var Paintablevue_type_script_lang_js_ = ({
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
      default: () => ['black', '#f00', '#4481c7', 'rgba(255, 235, 59, 0.4)', '#999', 'green']
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
      currentLineWidth: this.isEraserActive ? this.lineWidthEraser : this.lineWidth,
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
      return 'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
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
        this.pointCoords = []; // temporary canvas

        this.tempCanvas = this.$refs['temp-canvas-' + this.canvasId];
        this.tempCtx = this.tempCanvas.getContext('2d'); // canvas with drawing

        this.canvas = this.$refs['canvas-' + this.canvasId];
        this.ctx = this.canvas.getContext('2d');
        this.tempCtx.lineCap = 'round';
        this.ctx.lineCap = 'round';
        this.tempCtx.lineWidth = this.lineWidth;
        this.ctx.lineWidth = this.lineWidth;
        this.tempCtx.strokeStyle = this.currentColor;
        this.ctx.strokeStyle = this.currentColor;
        this.setItem(this.name + '-settings', JSON.stringify({
          width: this.canvas.width,
          height: this.canvas.height
        })); // load image from storage

        this.loadImageFromStorage();
        this.$emit('toggle-paintable', this.isActive);
      } catch (err) {// this.hide = true;
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
        this.setItem(this.name + '-settings', JSON.stringify({
          width: this.canvas.width,
          height: this.canvas.height
        }));
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
          currentX = (x - this.tempCanvas.getBoundingClientRect().left) * this.factor;
          currentY = (y - this.tempCanvas.getBoundingClientRect().top) * this.factor;
          this.pointCoords.push({
            x: currentX,
            y: currentY
          });
        }

        this.tempCtx.globalCompositeOperation = 'source-over';
        this.ctx.globalCompositeOperation = this.isEraserActive ? 'destination-out' : 'source-over';
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
      const points = this.pointCoords.filter((e, i) => i % (isTemporaryLine ? 10 : 25) === 0);
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
          currentX = (x - this.tempCanvas.getBoundingClientRect().left) * this.factor;
          currentY = (y - this.tempCanvas.getBoundingClientRect().top) * this.factor;
          this.pointCoords.push({
            x: currentX,
            y: currentY
          });

          if (this.threshold) {
            const distanceFirstAndLastPoint = Math.sqrt(Math.pow(this.pointCoords[this.pointCoords.length - 1].y - this.pointCoords[0].y, 2) + Math.pow(this.pointCoords[this.pointCoords.length - 1].x - this.pointCoords[0].x, 2));

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
});
// CONCATENATED MODULE: ./src/Paintable.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_Paintablevue_type_script_lang_js_ = (Paintablevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/Paintable.vue?vue&type=style&index=0&lang=css&
var Paintablevue_type_style_index_0_lang_css_ = __webpack_require__("4226");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/Paintable.vue






/* normalize component */

var component = normalizeComponent(
  src_Paintablevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Paintable = (component.exports);
// CONCATENATED MODULE: ./src/plugin.js

const PaintablePlugin = {
  install(Vue, options) {
    if (options && options.setItem) {
      Paintable.methods.setItem = options.setItem;
    }

    if (options && options.getItem) {
      Paintable.methods.getItem = options.getItem;
    }

    if (options && options.removeItem) {
      Paintable.methods.removeItem = options.removeItem;
    }

    Vue.component('paintable', Paintable);
  }

};
/* harmony default export */ var src_plugin = (PaintablePlugin);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src_plugin);



/***/ })

/******/ });
});