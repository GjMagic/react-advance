import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './views/Home/Home';
import registerServiceWorker from './registerServiceWorker';

import './static/css/reset_phone.css';
import './config/rem';
import './style.css';
import './static/iconfont/iconfont.css';

ReactDOM.render(
  <Router>
    <Route path='/' component={Home}/>
  </Router>, 
  document.getElementById('root')
);
registerServiceWorker();
