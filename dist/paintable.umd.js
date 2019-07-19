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

/***/ "2299":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, ".paintable,body{position:fixed}.paintable{overflow:hidden;height:100%;width:100%;-webkit-transform:scale(1);transform:scale(1)}.paintable.active{z-index:0}.paintable .canvas{position:relative;background-color:transparent;z-index:-1;position:absolute;left:0;top:0;overflow:hidden;-ms-touch-action:none;touch-action:none}.paintable .canvas.active{z-index:1000}.paintable .canvas.active.back{z-index:999}", ""]);

// exports


/***/ }),

/***/ "2350":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "4226":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Paintable_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f763");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Paintable_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Paintable_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Paintable_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "499e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return addStylesClient; });
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

/***/ "57b0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Navigation_vue_vue_type_style_index_0_id_67b314bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7724");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Navigation_vue_vue_type_style_index_0_id_67b314bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Navigation_vue_vue_type_style_index_0_id_67b314bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Navigation_vue_vue_type_style_index_0_id_67b314bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "7724":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("d76d");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("45e6a428", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "d76d":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, ".navigation[data-v-67b314bc]{position:fixed;right:20px;top:20px;z-index:1005;background-color:#333;border-radius:5px;color:#fff}.navigation .navigationMenu[data-v-67b314bc],.navigation .navigationMenu ul[data-v-67b314bc]{list-style:none;padding:0;margin:0}.navigation .navigationMenu li>div[data-v-67b314bc]{cursor:pointer;padding:12px}.navigation .navigationMenu li.disabled[data-v-67b314bc]{opacity:.5}.navigation__lineWidthPicker[data-v-67b314bc]{background:#333;position:absolute;left:-225px;top:0;padding:12px;border-radius:5px;-webkit-box-sizing:border-box;box-sizing:border-box}.navigation__lineWidthPickerDot[data-v-67b314bc]{margin-top:10px;border-radius:100%}.navigation__lineWidthPickerColor[data-v-67b314bc]{border-radius:100%;height:15px;width:15px;display:block;margin:0 0 10px;border:2px solid transparent}.navigation__lineWidthPickerColor[data-v-67b314bc]:last-child{margin:0}.navigation__lineWidthPickerColor.selected[data-v-67b314bc]{border:2px solid #fff}.navigation__colorPicker[data-v-67b314bc]{background:#333;position:absolute;left:-60px;top:0;padding:12px;border-radius:5px}.navigation__colorPickerColor[data-v-67b314bc]{border-radius:100%;height:15px;width:15px;display:block;margin:0 0 10px;border:2px solid transparent}.navigation__colorPickerColor[data-v-67b314bc]:last-child{margin:0}.navigation__colorPickerColor.selected[data-v-67b314bc]{border:2px solid #fff}.navigation__horizontalNavigation .navigationMenu li[data-v-67b314bc],.navigation__horizontalNavigation .navigationMenu ul[data-v-67b314bc]{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex}", ""]);

// exports


/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "f763":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("2299");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("46600cf8", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1384ead5-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Paintable.vue?vue&type=template&id=824e5b1e&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (!_vm.hide)?_c('div',{staticClass:"paintable"},[(!_vm.disableNavigation)?_c('Navigation',{attrs:{"horizontalNavigation":_vm.horizontalNavigation}},[_c('div',{attrs:{"slot":"paintable-navigation-draw"},slot:"paintable-navigation-draw"})]):_vm._e(),_c('canvas',{ref:'canvas-' + _vm.canvasId,staticClass:"canvas back",class:{ active: _vm.isActive || _vm.alwaysOnTop },style:({
      pointerEvents: !_vm.isActive ? 'none' : 'all',
      display: !_vm.canvasIsEmpty || _vm.isActive ? 'block' : 'none'
    }),attrs:{"width":_vm.width,"height":_vm.height}}),_c('canvas',{ref:'temp-canvas-' + _vm.canvasId,staticClass:"canvas",class:{ active: _vm.isActive || _vm.alwaysOnTop },style:({
      pointerEvents: !_vm.isActive ? 'none' : 'all',
      display: !_vm.canvasIsEmpty || _vm.isActive ? 'block' : 'none'
    }),attrs:{"width":_vm.width,"height":_vm.height},on:_vm._d({},[_vm.drawMoveEvent,_vm.drawMove,_vm.drawStartEvent,_vm.drawStart,_vm.drawEndEvent,_vm.drawEnd])}),_c('div',{staticClass:"content"},[_vm._t("default")],2)],1):_c('div',{staticClass:"content"},[_vm._t("default")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/Paintable.vue?vue&type=template&id=824e5b1e&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1384ead5-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Navigation.vue?vue&type=template&id=67b314bc&scoped=true&
var Navigationvue_type_template_id_67b314bc_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (!_vm.paintableView.hidePaintableNavigation)?_c('div',{staticClass:"navigation",class:{ navigation__horizontalNavigation: _vm.horizontalNavigation }},[(_vm.isColorPickerOpen)?_c('div',{staticClass:"navigation__colorPicker"},_vm._l((_vm.paintableView.colors),function(color){return _c('span',{key:color,class:[
        'navigation__colorPickerColor',
        { selected: _vm.paintableView.currentColor === color }
      ],style:({ backgroundColor: color }),on:{"click":function($event){return _vm.changeColor(color)}}})}),0):_vm._e(),(_vm.isLineWidthPickerOpen)?_c('div',{staticClass:"navigation__lineWidthPicker"},[_c('label',{attrs:{"for":"navigation__lineWidthPickerRange"}},[_vm._v("("+_vm._s(_vm.paintableView.currentLineWidth)+"px):")]),_c('br'),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.paintableView.currentLineWidth),expression:"paintableView.currentLineWidth"}],attrs:{"id":"navigation__lineWidthPickerRange","type":"range","min":"1","max":"100"},domProps:{"value":(_vm.paintableView.currentLineWidth)},on:{"change":function($event){_vm.isLineWidthPickerOpen = false},"__r":function($event){return _vm.$set(_vm.paintableView, "currentLineWidth", $event.target.value)}}}),_c('div',{staticClass:"navigation__lineWidthPickerDot",style:(_vm.lineWidthStyle)})]):_vm._e(),_c('ul',{staticClass:"navigationMenu",class:{ active: _vm.paintableView.isActive }},_vm._l((_vm.horizontalNavigation ? _vm.navigation.reverse() : _vm.navigation),function(item){return _c('li',{key:item.name,class:'navigationMenu__' + item.name},[(!_vm.horizontalNavigation)?_c('div',{domProps:{"innerHTML":_vm._s(item.isActive ? item.activeBody : item.body)},on:{"click":item.click}}):_vm._e(),(_vm.paintableView.isActive)?_c('ul',_vm._l((item.subNavigation),function(item){return _c('li',{key:item.name,class:[
            'navigationMenu__' + item.name,
            { disabled: item.disabled }
          ]},[_c('div',{domProps:{"innerHTML":_vm._s(item.isActive ? item.activeBody : item.body)},on:{"click":item.click}})])}),0):_vm._e(),(_vm.horizontalNavigation)?_c('div',{domProps:{"innerHTML":_vm._s(item.isActive ? item.activeBody : item.body)},on:{"click":item.click}}):_vm._e()])}),0)]):_vm._e()}
var Navigationvue_type_template_id_67b314bc_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Navigation.vue?vue&type=template&id=67b314bc&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Navigation.vue?vue&type=script&lang=js&
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
/* harmony default export */ var Navigationvue_type_script_lang_js_ = ({
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
        if (navigationItem.subNavigation && navigationItem.subNavigation.length > 0) {
          const navigationItemSubNavigation = this.horizontalNavigation ? navigationItem.subNavigation.reverse() : navigationItem.subNavigation;
          navigationItem.subNavigation = navigationItemSubNavigation.map(subNavigationItem => {
            if (this.paintableView.navigation && this.paintableView.navigation[subNavigationItem.name]) {
              return Object.assign({}, subNavigationItem, this.paintableView.navigation[subNavigationItem.name]);
            }

            return subNavigationItem;
          });
        }

        if (this.paintableView.navigation && this.paintableView.navigation[navigationItem.name]) {
          return Object.assign({}, navigationItem, this.paintableView.navigation[navigationItem.name]);
        }

        return navigationItem;
      });
    },

    filteredNavigation() {
      return [{
        name: 'draw-save',
        body: 'draw',
        activeBody: 'save',
        isActive: this.paintableView.isActive,
        click: this.togglePainting,
        subNavigation: [{
          name: 'color',
          body: 'color',
          disabled: false,
          show: this.paintableView.colors.length > 0,
          click: this.openColorPicker
        }, {
          name: 'line-width',
          body: 'line-width',
          disabled: false,
          show: this.paintableView.showLineWidth,
          click: this.openLineWidthPicker
        }, {
          name: 'undo',
          body: 'undo',
          disabled: !this.paintableView.undoList.length,
          show: this.paintableView.showUndoRedo,
          click: this.paintableView.undoDrawingStep
        }, {
          name: 'redo',
          body: 'redo',
          disabled: !this.paintableView.redoList.length,
          show: this.paintableView.showUndoRedo,
          click: this.paintableView.redoDrawingStep
        }, {
          name: 'delete',
          body: 'delete',
          disabled: false,
          show: true,
          click: this.paintableView.clearCanvas
        }, {
          name: 'eraser-pencil',
          body: 'eraser',
          activeBody: 'pencil',
          isActive: this.paintableView.isEraserActive,
          disabled: false,
          show: true,
          click: this.toggleEraserAndPencil
        }, {
          name: 'cancel',
          body: 'cancel',
          disabled: false,
          show: true,
          click: this.paintableView.cancelDrawing
        }].filter(item => item.show)
      }];
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
});
// CONCATENATED MODULE: ./src/components/Navigation.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Navigationvue_type_script_lang_js_ = (Navigationvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Navigation.vue?vue&type=style&index=0&id=67b314bc&scoped=true&lang=css&
var Navigationvue_type_style_index_0_id_67b314bc_scoped_true_lang_css_ = __webpack_require__("57b0");

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
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
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

// CONCATENATED MODULE: ./src/components/Navigation.vue






/* normalize component */

var component = normalizeComponent(
  components_Navigationvue_type_script_lang_js_,
  Navigationvue_type_template_id_67b314bc_scoped_true_render,
  Navigationvue_type_template_id_67b314bc_scoped_true_staticRenderFns,
  false,
  null,
  "67b314bc",
  null
  
)

/* harmony default export */ var Navigation = (component.exports);
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
  components: {
    Navigation: Navigation
  },
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
    disableNavigation: {
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
        })); // set canvas width and height

        this.setCanvasSize(); // load image from storage

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
        const restore_state = pop.pop();
        this.saveCurrentCanvasState(this.canvas, push, true);
        this.loadImageFromStorage(restore_state);
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
        let image = new Image();

        image.onload = () => {
          this.ctx.drawImage(image, 0, 0);
          this.canvasIsEmpty = this.isCanvasBlank();
        };

        image.src = base64Image; // eslint-disable-line
      } else {
        this.canvasIsEmpty = this.isCanvasBlank();
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
          currentX = x * this.factor - this.tempCanvas.getBoundingClientRect().left;
          currentY = y * this.factor - this.tempCanvas.getBoundingClientRect().top;
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
    drawLine(context) {
      this.tempCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      let p1 = this.pointCoords[0];
      let p2 = this.pointCoords[1];

      if (p1 && p2 && p1.x && p1.y) {
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
      }
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
          currentX = x * this.factor - this.tempCanvas.getBoundingClientRect().left;
          currentY = y * this.factor - this.tempCanvas.getBoundingClientRect().top;
          this.pointCoords.push({
            x: currentX,
            y: currentY
          });

          if (this.threshold) {
            const distanceFirstAndLastPoint = Math.sqrt(Math.pow(this.pointCoords[this.pointCoords.length - 1].y - this.pointCoords[0].y, 2) + Math.pow(this.pointCoords[this.pointCoords.length - 1].x - this.pointCoords[0].x, 2));

            if (distanceFirstAndLastPoint > this.threshold) {
              if (!this.thresholdReached) {
                this.thresholdReached = true;
                this.$emit('thresholdReached');
              }
            }
          }

          this.drawLine(!this.isEraserActive ? this.tempCtx : this.ctx);
        }
      }
    }

  }
});
// CONCATENATED MODULE: ./src/Paintable.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_Paintablevue_type_script_lang_js_ = (Paintablevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/Paintable.vue?vue&type=style&index=0&lang=css&
var Paintablevue_type_style_index_0_lang_css_ = __webpack_require__("4226");

// CONCATENATED MODULE: ./src/Paintable.vue






/* normalize component */

var Paintable_component = normalizeComponent(
  src_Paintablevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Paintable = (Paintable_component.exports);
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