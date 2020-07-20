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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = _interopRequireDefault(__webpack_require__(3));

var _fs = _interopRequireDefault(__webpack_require__(4));

var _path = _interopRequireDefault(__webpack_require__(5));

var _react = _interopRequireDefault(__webpack_require__(0));

var _App = _interopRequireDefault(__webpack_require__(6));

var url = _interopRequireWildcard(__webpack_require__(9));

var _server = __webpack_require__(10);

var _styledComponents = __webpack_require__(1);

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ? react-dom/server에 서버에서 사용되는 기능이 모여있다.
// ? styled-components의 SSR 설정을 위한 임포트
// express를 app변수에 담아 미들웨어/url설정을 하게 된다.
const app = (0, _express.default)(); // 서버에서 구동될 html불러오기 = 번들된 index.html!
// SSR에서는 불러드린 번들.html을 기반으로 새로운 indexSSR.html을 생성!

const html = _fs.default.readFileSync(_path.default.resolve(__dirname, '../dist/index.html'), 'utf8'); // 엔드포인트별 설정
// root/dist 경로일때 루트/dist 폴더에서 정적파일 연결


app.use('/dist', _express.default.static('dist')); // 파비콘 연결 = 204 : no Content
// 브라우저가 자동으로 요청하는 favicon.ico파일이 다음 '*'에서 처리되지 않도록 하는 코드

app.get('/favicon.ico', (req, res) => res.sendStatus(204)); // 나머지 모든 경로에 대해(*) 처리하는 함수등록

app.get('*', (req, res) => {
  // url을 분석하기위한 url모듈 사용
  const parsedUrl = url.parse(req.url, true); // url.pathname위치에 값이 있으면 그 값의 경로로 페이지 보여준다! 없으면 기본 home 적용

  console.log('서버 패스네임은 ', parsedUrl.pathname);
  const page = parsedUrl.pathname === '/' ? 'home' : parsedUrl.pathname.substr(1); // 스타일을 추출하는데 사용할 인스턴스를 생성

  const sheet = new _styledComponents.ServerStyleSheet(); // App컴포넌트를 문자열로 반환하여 변수에 담음
  // 추가+ 스타일드컴포넌트를 위한 sheet.ㅋ(컴포넌트)적용

  const renderSTR = (0, _server.renderToString)(sheet.collectStyles( /*#__PURE__*/_react.default.createElement(_App.default, {
    page: page
  }))); //

  const styles = sheet.getStyleTags(); // 클라이언트에 전달할 초기데이터 initialData

  const initialData = {
    page
  };
  console.log('서버 initialData는 ', initialData); // html에서 id가 루트인 코드에 App컴포넌트 문자열을 삽입한다
  // replace체이닝을 통해 초기값 데이터를 __DATA_FROM_SERVER__변수에 담는다

  const result = html.replace('<div id="root"></div>', `<div id="root">${renderSTR}</div>`).replace('__DATA_FROM_SERVER__', JSON.stringify(initialData)).replace('__STYLE_FROM_SERVER__', styles); // 결과를 response에 담아 보낸다

  res.send(result);
});
app.listen(3000, () => console.log('http://localhost:3000')); // 3000포트로 들어오는 요청을 듣고있는 중

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__(0));

var _styledComponents = _interopRequireDefault(__webpack_require__(1));

var _Home = _interopRequireDefault(__webpack_require__(7));

var _About = _interopRequireDefault(__webpack_require__(8));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const App = props => {
  const [nav, setNav] = (0, _react.useState)(props.page);

  const onClickNav = e => {
    const pg = e.target.dataset.page;
    console.log('click button : ', pg);
    window.history.pushState(pg, '', `/${pg}`);
    setNav(pg);
  };

  (0, _react.useEffect)(() => {
    console.log('props.page', props.page);
    console.log('마운트완료, 기본세팅'); // window.onpopstate = (e) => {
    //   console.log(e);
    //   setNav(e.state);
    // };
  }, []);
  const PageComponent = nav === 'home' ? _Home.default : _About.default;
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("nav", null, /*#__PURE__*/_react.default.createElement(BTN, {
    "data-page": "home",
    onClick: onClickNav
  }, "HOME"), /*#__PURE__*/_react.default.createElement(BTN, {
    "data-page": "about",
    onClick: onClickNav
  }, "ABOUT")), /*#__PURE__*/_react.default.createElement("div", null, "\uD398\uC774\uC9C0 \uCEF4\uD3EC\uB10C\uD2B8 \uC2DC\uC791", /*#__PURE__*/_react.default.createElement(PageComponent, null), "\uD398\uC774\uC9C0 \uCEF4\uD3EC\uB10C\uD2B8 \uB05D"));
};

const BTN = _styledComponents.default.p`
  display: inline-block;
  background-color: greenyellow;
  font-weight: 900;
  padding: 20px;
  margin: 10px;
`;
var _default = App;
exports.default = _default;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Home = () => {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h3", null, "\uC5EC\uAE30\uB294 Home"));
};

var _default = Home;
exports.default = _default;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const About = () => {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h3", null, "\uC5EC\uAE30\uB294 About"));
};

var _default = About;
exports.default = _default;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ })
/******/ ]);