import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './views/App';
import registerServiceWorker from './registerServiceWorker';

import './static/css/reset_phone.css';
import './config/rem';

ReactDOM.render(
  <Router>
    <Route path='/' component={App}/>
  </Router>, 
  document.getElementById('root')
);
registerServiceWorker();
