/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_0__);\n\r\n// import img from \"../public/img\";\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", renderNews);\r\n\r\nfunction renderNews() {\r\n  const newsCards = [\r\n    document.querySelector(\".news-card-1\"),\r\n    document.querySelector(\".news-card-2\"),\r\n    document.querySelector(\".news-card-3\"),\r\n  ];\r\n\r\n  fetchNewsFrom(\"newsESP\").then((newsArray) => {\r\n    const news = newsArray[0];\r\n    const { url, thumbnail, caption } = news;\r\n\r\n    const aTag = newsCards[2].children[1];\r\n    const imgTagContainer = newsCards[2].children[0];\r\n    const image = document.createElement(\"img\");\r\n\r\n    image.setAttribute(\"src\", thumbnail);\r\n    imgTagContainer.appendChild(image);\r\n    aTag.setAttribute(\"href\", url);\r\n    aTag.textContent = caption;\r\n  });\r\n\r\n  fetchNewsFrom(\"newsENG\").then((newsArray) => {\r\n    newsArray.map((news, index) => {\r\n      if (index < 2) {\r\n        const { url, thumbnail, caption } = news;\r\n\r\n        const aTag = newsCards[index].children[1];\r\n        const imgTagContainer = newsCards[index].children[0];\r\n        const image = document.createElement(\"img\");\r\n\r\n        image.setAttribute(\"src\", thumbnail);\r\n        imgTagContainer.appendChild(image);\r\n        aTag.setAttribute(\"href\", url);\r\n        aTag.textContent = caption;\r\n      }\r\n    });\r\n  });\r\n}\r\n\r\nfunction fetchNewsFrom(endpoint) {\r\n  const baseUrl = `http://localhost:3000/${endpoint}`;\r\n\r\n  return fetch(baseUrl)\r\n    .then((response) => response.json())\r\n    .then((data) => data);\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbWFpbi5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9tYWluLmpzPzU2ZDciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwiLi9zdHlsZXMuY3NzXCI7XHJcbi8vIGltcG9ydCBpbWcgZnJvbSBcIi4uL3B1YmxpYy9pbWdcIjtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIHJlbmRlck5ld3MpO1xyXG5cclxuZnVuY3Rpb24gcmVuZGVyTmV3cygpIHtcclxuICBjb25zdCBuZXdzQ2FyZHMgPSBbXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5ld3MtY2FyZC0xXCIpLFxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZXdzLWNhcmQtMlwiKSxcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmV3cy1jYXJkLTNcIiksXHJcbiAgXTtcclxuXHJcbiAgZmV0Y2hOZXdzRnJvbShcIm5ld3NFU1BcIikudGhlbigobmV3c0FycmF5KSA9PiB7XHJcbiAgICBjb25zdCBuZXdzID0gbmV3c0FycmF5WzBdO1xyXG4gICAgY29uc3QgeyB1cmwsIHRodW1ibmFpbCwgY2FwdGlvbiB9ID0gbmV3cztcclxuXHJcbiAgICBjb25zdCBhVGFnID0gbmV3c0NhcmRzWzJdLmNoaWxkcmVuWzFdO1xyXG4gICAgY29uc3QgaW1nVGFnQ29udGFpbmVyID0gbmV3c0NhcmRzWzJdLmNoaWxkcmVuWzBdO1xyXG4gICAgY29uc3QgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG5cclxuICAgIGltYWdlLnNldEF0dHJpYnV0ZShcInNyY1wiLCB0aHVtYm5haWwpO1xyXG4gICAgaW1nVGFnQ29udGFpbmVyLmFwcGVuZENoaWxkKGltYWdlKTtcclxuICAgIGFUYWcuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCB1cmwpO1xyXG4gICAgYVRhZy50ZXh0Q29udGVudCA9IGNhcHRpb247XHJcbiAgfSk7XHJcblxyXG4gIGZldGNoTmV3c0Zyb20oXCJuZXdzRU5HXCIpLnRoZW4oKG5ld3NBcnJheSkgPT4ge1xyXG4gICAgbmV3c0FycmF5Lm1hcCgobmV3cywgaW5kZXgpID0+IHtcclxuICAgICAgaWYgKGluZGV4IDwgMikge1xyXG4gICAgICAgIGNvbnN0IHsgdXJsLCB0aHVtYm5haWwsIGNhcHRpb24gfSA9IG5ld3M7XHJcblxyXG4gICAgICAgIGNvbnN0IGFUYWcgPSBuZXdzQ2FyZHNbaW5kZXhdLmNoaWxkcmVuWzFdO1xyXG4gICAgICAgIGNvbnN0IGltZ1RhZ0NvbnRhaW5lciA9IG5ld3NDYXJkc1tpbmRleF0uY2hpbGRyZW5bMF07XHJcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG5cclxuICAgICAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgdGh1bWJuYWlsKTtcclxuICAgICAgICBpbWdUYWdDb250YWluZXIuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG4gICAgICAgIGFUYWcuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCB1cmwpO1xyXG4gICAgICAgIGFUYWcudGV4dENvbnRlbnQgPSBjYXB0aW9uO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmV0Y2hOZXdzRnJvbShlbmRwb2ludCkge1xyXG4gIGNvbnN0IGJhc2VVcmwgPSBgaHR0cDovL2xvY2FsaG9zdDozMDAwLyR7ZW5kcG9pbnR9YDtcclxuXHJcbiAgcmV0dXJuIGZldGNoKGJhc2VVcmwpXHJcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIC50aGVuKChkYXRhKSA9PiBkYXRhKTtcclxufVxyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/main.js\n");

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc3R5bGVzLmNzcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zdHlsZXMuY3NzP2E3ZjMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/styles.css\n");

/***/ })

/******/ });