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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(__webpack_require__(0));

var _styledComponents = _interopRequireDefault(__webpack_require__(1));

var _Home = _interopRequireDefault(__webpack_require__(10));

var _About = _interopRequireDefault(__webpack_require__(11));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  background-color: greenyellow;\n  font-weight: 900;\n  padding: 20px;\n  margin: 10px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var fetchUsername = function fetchUsername() {
  var usernames = ['zuzu', 'mimi', 'janny'];
  return new Promise(function (resolve) {
    var username = usernames[Math.floor(Math.random() * 3)];
    setTimeout(function () {
      return resolve(username);
    }, 100);
  });
};

var App = function App(props) {
  var _useState = (0, _react.useState)(props.page),
      _useState2 = _slicedToArray(_useState, 2),
      nav = _useState2[0],
      setNav = _useState2[1];

  var _useState3 = (0, _react.useState)(''),
      _useState4 = _slicedToArray(_useState3, 2),
      username = _useState4[0],
      setUsername = _useState4[1];

  var onClickNav = function onClickNav(e) {
    var pg = e.target.dataset.page;
    console.log('click button : ', pg);
    window.history.pushState(pg, '', "/".concat(pg));
    setNav(pg);
  };

  (0, _react.useEffect)(function () {
    fetchUsername().then(function (username) {
      return setUsername(username);
    });
  }, []);
  var PageComponent = nav === 'home' ? _Home["default"] : _About["default"];
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("nav", null, /*#__PURE__*/_react["default"].createElement(BTN, {
    "data-page": "home",
    onClick: onClickNav
  }, "HOME"), /*#__PURE__*/_react["default"].createElement(BTN, {
    "data-page": "about",
    onClick: onClickNav
  }, "ABOUT")), /*#__PURE__*/_react["default"].createElement("div", null, "\uD398\uC774\uC9C0 \uCEF4\uD3EC\uB10C\uD2B8 \uC2DC\uC791", /*#__PURE__*/_react["default"].createElement(PageComponent, {
    username: username
  }), "\uD398\uC774\uC9C0 \uCEF4\uD3EC\uB10C\uD2B8 \uB05D"));
};

var BTN = _styledComponents["default"].p(_templateObject());

var _default = App;
exports["default"] = _default;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _express = _interopRequireDefault(__webpack_require__(7));

var _fs = _interopRequireDefault(__webpack_require__(2));

var _path = _interopRequireDefault(__webpack_require__(3));

var url = _interopRequireWildcard(__webpack_require__(8));

var _lruCache = _interopRequireDefault(__webpack_require__(9));

var _styledComponents = __webpack_require__(1);

var _react = _interopRequireDefault(__webpack_require__(0));

var _App = _interopRequireDefault(__webpack_require__(4));

var _common = __webpack_require__(12);

var _server = __webpack_require__(5);

var _stream = __webpack_require__(13);

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// ? 중간에 삽입할 스트림을 생성하는 함수로직
var createCacheStream = function createCacheStream(cacheKey, prefix, postfix) {
  // ? 청크 모아서 청크를 SSR cache에 저장할거다
  var chunks = [];
  return new _stream.Transform({
    // ? 청크데이터를 받으면 호출되는 함수
    transform: function transform(data, _, callback) {
      chunks.push(data);
      callback(null, data);
    },
    // ? 청크데이터가 모두 전달되면 호출되는 함수
    flush: function flush(callback) {
      var data = [prefix, Buffer.concat(chunks).toString(), postfix];
      ssrCache.set(cacheKey, data.join(''));
      callback();
    }
  });
};

var ssrCache = new _lruCache["default"]({
  max: 100,
  maxAge: 1000 * 60
});
var app = (0, _express["default"])();
var prerenderHTML = {};

var _iterator = _createForOfIteratorHelper(_common.prerenderPages),
    _step;

try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var page = _step.value;

    var pageHTML = _fs["default"].readFileSync(_path["default"].resolve(__dirname, "../dist/".concat(page, ".html")), 'utf8');

    prerenderHTML[page] = pageHTML;
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}

var html = _fs["default"].readFileSync(_path["default"].resolve(__dirname, '../dist/index.html'), 'utf8').replace('__STYLE_FROM_SERVER__', '');

app.use('/dist', _express["default"]["static"]('dist'));
app.get('/favicon.ico', function (req, res) {
  return res.sendStatus(204);
});
app.get('*', function (req, res) {
  var parsedURL = url.parse(req.url, true);
  var cacheKey = parsedURL.path;

  if (ssrCache.has(cacheKey)) {
    console.log('캐시사용');
    res.send(ssrCache.get(cacheKey));
    return;
  }

  var page = parsedURL.pathname ? parsedURL.pathname.substr(1) : 'home';
  var initialData = {
    page: page
  };

  var isPrerender = _common.prerenderPages.includes(page);

  var curHTML = isPrerender ? prerenderHTML[page] : html;
  var result = curHTML.replace('__DATA_FROM_SERVER__', JSON.stringify(initialData));

  if (isPrerender) {
    ssrCache.set(cacheKey, result);
    res.send(result);
  } else {
    var ROOT_TEXT = '<div id="root">';
    var prefix = result.substr(0, result.indexOf(ROOT_TEXT) + ROOT_TEXT.length);
    var postfix = result.substr(prefix.length);
    res.write(prefix);
    var sheet = new _styledComponents.ServerStyleSheet();
    var reactElement = sheet.collectStyles( /*#__PURE__*/_react["default"].createElement(_App["default"], {
      page: page
    }));
    var renderStream = sheet.interleaveWithNodeStream((0, _server.renderToNodeStream)(reactElement)); // ?

    var cacheStream = createCacheStream(cacheKey, prefix, postfix);
    cacheStream.pipe(res);
    renderStream.pipe(cacheStream, {
      end: false
    });
    renderStream.on('end', function () {
      res.end(postfix);
    });
  }
});
app.listen(3000, function () {
  console.log('http://localhost:3000');
});

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("lru-cache");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Home = function Home(_ref) {
  var username = _ref.username;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h3", null, "\uC5EC\uAE30\uB294 Home"), username && /*#__PURE__*/_react["default"].createElement("p", null, "".concat(username, "\uB2D8 \uC548\uB155\uD558\uC138\uC694")));
};

var _default = Home;
exports["default"] = _default;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var About = function About() {
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h3", null, "\uC5EC\uAE30\uB294 About"));
};

var _default = About;
exports["default"] = _default;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderPage = exports.prerenderPages = void 0;

var _fs = _interopRequireDefault(__webpack_require__(2));

var _path = _interopRequireDefault(__webpack_require__(3));

var _react = _interopRequireDefault(__webpack_require__(0));

var _server = __webpack_require__(5);

var _App = _interopRequireDefault(__webpack_require__(4));

var _styledComponents = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var html = _fs["default"].readFileSync(_path["default"].resolve(__dirname, '../dist/index.html'), 'utf8');

var prerenderPages = ['home'];
exports.prerenderPages = prerenderPages;

var renderPage = function renderPage(page) {
  // server.js에서 작성했던대로, 스타일 정보 변환하고, 태그 string으로 받아서 태그 교체해 주는 작업을 즌행한다.
  var sheet = new _styledComponents.ServerStyleSheet();
  var renderSTR = (0, _server.renderToString)(sheet.collectStyles( /*#__PURE__*/_react["default"].createElement(_App["default"], {
    page: page
  })));
  var styles = sheet.getStyleTags();
  var result = html.replace('<div id="root"></div>', "<div id=\"root\">".concat(renderSTR, "</div>")).replace('__STYLE_FROM_SERVER__', styles);
  return result;
};

exports.renderPage = renderPage;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ })
/******/ ]);