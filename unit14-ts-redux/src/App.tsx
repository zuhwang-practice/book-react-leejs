import React from 'react';
import { Provider } from 'react-redux';
import { store } from './common/store';
import Person from './person/component/Person';
import Product from './product/component/Product';

function App() {
  return (
    <Provider store={store}>
      <div>
        <Person birthday='2014-4-15'></Person>
        <Product></Product>
      </div>
    </Provider>
  );
}

export default App;
