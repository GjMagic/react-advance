import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

let data = [
  {
    imgSrc: require('./common/images/elyse.png'),
    name: 'elyse',
    meta: 'Coworker',
    desc: 'Elyse is a copyWriter in New York',
    joined: 2014,
    likeNum: 151
  },
  {
    imgSrc: require('./common/images/matthew.png'),
    name: 'matthew',
    meta: 'Matt',
    desc: 'matthew is a editor in New York',
    joined: 2012,
    likeNum: 101
  },
  {
    imgSrc: require('./common/images/molly.png'),
    name: 'molly',
    meta: 'Mike',
    desc: 'molly is a cookMan in New York',
    joined: 2013,
    likeNum: 251
  }
]

ReactDOM.render(
  <App data={data} />, 
  document.getElementById('root')
);
