"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var App = function (_a) {
    var name = _a.name, age = _a.age;
    return (<div>
      <h1>헬로월도!</h1>
      <p>이름 : {name}</p>
      <p>나이 : {age}</p>
    </div>);
};
exports.default = App;
