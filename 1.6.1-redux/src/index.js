import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './App';
import { counter } from './reducer';

const reduxDevtools = window.devToolsExtension() ? window.devToolsExtension() : () => {};
const store = createStore(counter, compose( // compose用来组合函数
  applyMiddleware(thunk),
  reduxDevtools
));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
)