// import React from 'react';
// import ReactDOM from 'react-dom';
import App from './App';
import { sayHello } from './util';
import { func1 } from './util_esm';
// import { func3 } from './util_commonjs';

func1();
// func3();

// function myFunc() {
sayHello('zuzu!');
// console.log('myFunc');
// }

// myFunc();

ReactDOM.render(<App />, document.getElementById('root'));
