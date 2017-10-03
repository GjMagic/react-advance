import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Nav from './components/nav/Nav'
import CardWrap from './components/cardWrap/CardWrap'
import Home from './components/home/Home'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      view: 'home'
    }
    this.changeView = this.changeView.bind(this)
  }
  
  getChildContext() { // getChildContext与childContextTypes对应
    return {
      txt: 'died'
    }
  }

  changeView(view) {
    this.setState({
      view
    })
  }

  render() {
    
    let {view} = this.state
    let {data} = this.props
    let viewComp = null

    switch (view) {
      case 'home':
        viewComp = <Home />      
        break;
      /* case 'list':
        viewComp = <CardWrap data={data} />
        break; */
      default:
        viewComp = <CardWrap data={data} />
        break;
    }

    return (
      <div>
        <div className="ui container">
          <div className="ui dividing">
            <Nav changeView={this.changeView} /> {/* 子组件向父组件通信时，父组件需要通过属性把回调函数传向子组件 */}
            {viewComp}
          </div>
        </div>
      </div>
    );
  }
}

App.childContextTypes = {
  txt: PropTypes.string
}
export default App