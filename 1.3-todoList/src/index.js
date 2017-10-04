import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let data = [
  {
    id: 1,
    title: '世界那么大',
    isChecked: false 
  },
  {
    id: 2,
    title: '我想去看看',
    isChecked: false 
  },
  {
    id: 3,
    title: '想都别想！',
    isChecked: false 
  }
]

ReactDOM.render(<App data={data} />, document.getElementById('root'));
registerServiceWorker();
