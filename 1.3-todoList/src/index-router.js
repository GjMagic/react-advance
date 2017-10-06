import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

function Abc(props) {
  console.log(props)
  return (
    <div>我是Abc</div>
  )
}

function Bbc(props) {
  console.log(props) 
  let {history} = props 
  return (
    <div
      onClick={ ev => {
        history.push('/', {
          aa: 80
        }) // history的push方法也可以跳转链接,他的第二个参数就是state
      } }
    >我是Bbc</div>
  )
}

ReactDOM.render(
  <Router>
    <div>
      <p><Link to="/" >app</Link></p> {/* to后也可以是对象 */}
      <p><Link to={ {
        pathname: '/abc',
        state: {
          hk: 90
        }
      } } >abc</Link></p>
      <p><Link to="/bbc" >bbc</Link></p>
      <Route exact path='/' render={
        (props) => {
          console.log(props)
          return (
            <div>
              <App />
            </div>
          )
        }
      } />
      <Route strict path='/abc' component={Abc}/>
      <Route exact path='/bbc' component={Bbc}/>
    </div>
  </Router>, 
  document.getElementById('root')
);
registerServiceWorker();
