import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import { counter, addGUN, removeGUN, addGUNAsync } from './reducer';

const reduxDevtools = window.devToolsExtension() ? window.devToolsExtension() : () => {};
const store = createStore(counter, compose( // compose用来组合函数
  applyMiddleware(thunk),
  reduxDevtools
));

function render() {
  ReactDOM.render(
    <App {
      ...{
        store, 
        addGUN, 
        removeGUN,
        addGUNAsync
      }
    } />, 
    document.getElementById('root')
  )
}
render();
store.subscribe(render);