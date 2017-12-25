import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './container/login/Login';
import Register from './container/register/Register';
import AuthRoute from './component/authroute/AuthRoute';
import BossInfo from './container/bossinfo/BossInfo';
import GeniusInfo from './container/geniusinfo/GeniusInfo';
import Dashboard from './component/dashboard/Dashboard';
import Chat from './component/Chat/Chat';

import reducers from './reducer';
import './config';
import './index.css';

const reduxDevtools = window.devToolsExtension() ? window.devToolsExtension() : () => {};
const store = createStore(reducers, compose( // compose用来组合函数
  applyMiddleware(thunk),
  reduxDevtools
));
// Switch 主要用来依次向下做唯一匹配的功能。就是想要在众多路由中只匹配其中一个路由
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute />
        <Switch>
          <Route path='/bossinfo' component={BossInfo}/>
          <Route path='/geniusinfo' component={GeniusInfo}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/chat/:user' component={Chat}/>
          <Route component={Dashboard}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>, 
  document.getElementById('root')
)