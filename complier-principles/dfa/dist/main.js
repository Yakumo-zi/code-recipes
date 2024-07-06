/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   dfaState: () => (/* binding */ dfaState),\n/* harmony export */   tokenType: () => (/* binding */ tokenType)\n/* harmony export */ });\nconst dfaState = {\n  Initial: \"Initial\",\n  Id: \"Id\",\n  Id_int1: \"Id_int1\",\n  Id_int2: \"Id_int2\",\n  Id_int3: \"Id_int3\",\n  Int: \"Int\",\n  IntLiteral: \"IntLiteral\",\n  GE: \"GE\",\n  GT: \"GT\",\n  EQ: \"EQ\",\n  NOT: \"NOT\",\n  NE: \"NE\",\n};\n\nconst tokenType = {\n  Initial: \"Initial\",\n  Identifier: \"Identifier\",\n  IntLiteral: \"IntLiteral\",\n  Int: \"Int\",\n  GE: \"GE\",\n  GT: \"GT\",\n  EQ: \"EQ\",\n  NOT: \"NOT\",\n  NE: \"NE\",\n  Assignment: \"Assignment\",\n};\n\n//# sourceURL=webpack://complier-principles/./src/constants.js?");

/***/ }),

/***/ "./src/dfa.js":
/*!********************!*\
  !*** ./src/dfa.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   dfa: () => (/* binding */ dfa)\n/* harmony export */ });\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./src/constants.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./type.js */ \"./src/type.js\");\n\n\n\n\nconst initToken = (c, token) => {\n  let state = _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.Initial;\n  if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isAlpha)(c)) {\n    if (c == \"i\") {\n      state = _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.Id_int1;\n    } else {\n      state = _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.Id;\n    }\n    token.type = _constants_js__WEBPACK_IMPORTED_MODULE_0__.tokenType.Identifier;\n    token.text += c;\n  } else if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isDigit)(c)) {\n    state = _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.IntLiteral;\n    token.type = _constants_js__WEBPACK_IMPORTED_MODULE_0__.tokenType.IntLiteral;\n    token.text += c;\n  } else if (c == \">\") {\n    state = _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.GT;\n    token.type = _constants_js__WEBPACK_IMPORTED_MODULE_0__.tokenType.GT;\n    token.text += c;\n  } else if (c == \"=\") {\n    state = _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.EQ;\n    token.type = _constants_js__WEBPACK_IMPORTED_MODULE_0__.tokenType.EQ;\n    token.text += c;\n  } else if (c == \"!\") {\n    state = _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.NOT;\n    token.type = _constants_js__WEBPACK_IMPORTED_MODULE_0__.tokenType.NOT;\n    token.text += c;\n  }\n  return state;\n};\n/**\n * @param {String} input\n */\nfunction dfa(input) {\n  let tokens = [];\n  let token = null;\n  let state = _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.Initial;\n  let i = 0;\n  while (i < input.length) {\n    let c = input[i];\n    switch (state) {\n      case _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.Initial:\n        if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isBlank)(c)) {\n          break;\n        }\n        if (token != null) {\n          tokens.push(token);\n        }\n        token = new _type_js__WEBPACK_IMPORTED_MODULE_2__.Token();\n        state = initToken(c, token);\n        break;\n      case _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.Id_int1:\n        if (c == \"n\") {\n          state = _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.Id_int2;\n        } else if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isAlpha)(c) || (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isDigit)(c)) {\n          state = _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.Id;\n        } else {\n          state = _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.Initial;\n        }\n        token.text += c;\n        break;\n      case _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.Id_int2:\n        if (c == \"t\") {\n          state = _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.Id_int3;\n        } else if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isAlpha)(c) || (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isDigit)(c)) {\n          state = _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.Id;\n        } else {\n          state = _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.Initial;\n        }\n        token.text += c;\n        break;\n      case _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.Id_int3:\n        if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isBlank)(c)) {\n          token.type = _constants_js__WEBPACK_IMPORTED_MODULE_0__.tokenType.Int;\n          state = _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.Initial;\n        } else {\n          state = _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.Id;\n          token.text += c;\n        }\n        break;\n      case _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.Id:\n        if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isAlpha)(c) || (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isDigit)(c)) {\n          token.text += c;\n        } else {\n          state = _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.Initial;\n          continue;\n        }\n        break;\n      case _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.IntLiteral:\n        if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isDigit)(c)) {\n          token.text += c;\n        } else {\n          state = _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.Initial;\n          continue;\n        }\n        break;\n      case _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.GT:\n        if (c == \"=\") {\n          token.type = _constants_js__WEBPACK_IMPORTED_MODULE_0__.tokenType.GE;\n          token.text += c;\n        }\n        state = _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.Initial;\n        break;\n      case _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.GE:\n        state = _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.Initial;\n        break;\n      case _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.EQ:\n        if (c == \"=\") {\n          token.type = _constants_js__WEBPACK_IMPORTED_MODULE_0__.tokenType.EQ;\n          token.text += c;\n        } else if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isBlank)(c) || (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isAlpha)(c) || (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isDigit)(c)) {\n          token.type = _constants_js__WEBPACK_IMPORTED_MODULE_0__.tokenType.Assignment;\n        }\n        state = _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.Initial;\n        break;\n      case _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.NOT:\n        if (c == \"=\") {\n          token.type = _constants_js__WEBPACK_IMPORTED_MODULE_0__.tokenType.NE;\n          token.text += c;\n        } else if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isAlpha)(c) || (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isDigit)(c)) {\n          token.type = _constants_js__WEBPACK_IMPORTED_MODULE_0__.tokenType.NOT;\n        }\n        state = _constants_js__WEBPACK_IMPORTED_MODULE_0__.dfaState.Initial;\n        break;\n    }\n    i++;\n  }\n  if (token != null) {\n    tokens.push(token);\n  }\n  return tokens;\n}\n\n//# sourceURL=webpack://complier-principles/./src/dfa.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dfa_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dfa.js */ \"./src/dfa.js\");\n\n\nconsole.log((0,_dfa_js__WEBPACK_IMPORTED_MODULE_0__.dfa)(\"int a = 1\"))\n\n//# sourceURL=webpack://complier-principles/./src/index.js?");

/***/ }),

/***/ "./src/type.js":
/*!*********************!*\
  !*** ./src/type.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Token: () => (/* binding */ Token)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n\nclass Token {\n  constructor() {\n    this.type = _constants__WEBPACK_IMPORTED_MODULE_0__.dfaState.Initial;\n    this.text = \"\";\n  }\n}\n\n//# sourceURL=webpack://complier-principles/./src/type.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   isAlpha: () => (/* binding */ isAlpha),\n/* harmony export */   isBlank: () => (/* binding */ isBlank),\n/* harmony export */   isDigit: () => (/* binding */ isDigit)\n/* harmony export */ });\nconst isAlpha = (c) => {\n  return /[a-zA-Z]/.test(c);\n};\nconst isDigit = (c) => {\n  return /[0-9]/.test(c);\n};\nconst isBlank = (c) => {\n  return /\\s/.test(c);\n};\n\n//# sourceURL=webpack://complier-principles/./src/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;