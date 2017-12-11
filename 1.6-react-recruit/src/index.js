import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './container/login/Login';
import Register from './container/register/Register';
import AuthRoute from './component/authroute/AuthRoute';

import reducers from './reducer';
import './config';

const reduxDevtools = window.devToolsExtension() ? window.devToolsExtension() : () => {};
const store = createStore(reducers, compose( // compose用来组合函数
  applyMiddleware(thunk),
  reduxDevtools
));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute />
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
      </div>
    </BrowserRouter>
  </Provider>, 
  document.getElementById('root')
)